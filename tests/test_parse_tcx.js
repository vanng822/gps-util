var assert = require('assert');

var tcx = require('../lib/tcx-parser.js');
var vows = require('vows');
var nock = require('nock');

/* For testing url based gpx data */
var http = require('http');
var fs = require('fs');
var HOST = 'http://fakedomain.tld';
fs.readFile('./tests/data/data.tcx', function(err, data) {
	if(err) {
		throw err;
	}
	nock(HOST)
	.get('/data.tcx')
	.reply(200, data, {
		'Content-Type' : 'application/xml'
	});
});
nock(HOST)
.get('/bad.tcx')
.reply(404, 'Hey bad request!',{
	'Content-Type' : 'text/html'
});

nock(HOST)
.get('/soft404.tcx')
.reply(200, 'This is a soft 404 which has 200 as status code',{
	'Content-Type' : 'text/xml'
});

nock(HOST)
.get('/broken.tcx')
.reply(200, '<?xml version="1.0" encoding="UTF-8"?><TrainingCenterDatabase><Activities><Activity Sport="Running"></TrainingCenterDatabase>',{
	'Content-Type' : 'text/xml'
});


fs.readFile('./tests/data/loading.gif', function(err, data) {
	if(err) {
		throw err;
	}
	nock(HOST)
	.get('/image.tcx')
	.reply(200, data,{
		'Content-Type' : 'application/xml'
	});
});

vows.describe('Test suite for parsing tcx').addBatch({
	'Parse broken tcx data' : {
		topic : function() {
			tcx.tcxParse('<?xml version="1.0" encoding="UTF-8"?><TrainingCenterDatabase><Activities><Activity Sport="Running"></TrainingCenterDatabase>', this.callback);
		},
		'should return an error' : function(err, result) {
			assert.equal(err != null, true);
			assert.equal(result == null, true);
		}
	},
	'Parse valid xml but wrong format' : {
		topic : function() {
			tcx.tcxParse('<?xml version="1.0" encoding="UTF-8"?><gpx></gpx>', this.callback);
		},
		'should return an error' : function(err, result) {
			assert.equal(err != null, true);
			assert.equal(result == null, true);
		}
	},
	'Parse tcx file data.tcx' : {
		'topic' : function() {
			tcx.tcxParseFile('./tests/data/data.tcx', this.callback);
		},
		'Should return an array of three tracking points' : function(err, result) {
			assert.deepEqual(result, [{
				distance : 0,
				lat : null,
				lng : null,
				speed : 1.7480000257492068,
				time : new Date('2013-01-16T18:54:46.000Z'),
				altitude : 48.400001525878906
			}, {
				distance : 10.600000381469727,
				lat : 59.19330538250506,
				lng : 17.662933934479952,
				speed : 1.9600000381469729,
				time : new Date('2013-01-16T18:54:52.000Z'),
				altitude : 68.4000015258789
			}, {
				distance : 29.540000915527344,
				lat : 59.19347486458719,
				lng : 17.662943825125694,
				speed : 2.598000049591064,
				time : new Date('2013-01-16T18:54:58.000Z'),
				altitude : 68.4000015258789
			}]);

		}
	},
	'Parse tcx file data_missing_ext.tcx' : {
		'topic' : function() {
			tcx.tcxParseFile('./tests/data/data_missing_ext.tcx', this.callback);
		},
		'Should return an array of three tracking points' : function(err, result) {
			assert.deepEqual(result, [{
				distance : 0,
				lat : null,
				lng : null,
				speed : 1.7480000257492068,
				time : new Date('2013-01-16T18:54:46.000Z'),
				altitude : 48.400001525878906
			}, {
				distance : 10.600000381469727,
				lat : 59.19330538250506,
				lng : 17.662933934479952,
				speed : null,
				time : new Date('2013-01-16T18:54:52.000Z'),
				altitude : 68.4000015258789
			}, {
				distance : 29.540000915527344,
				lat : 59.19347486458719,
				lng : 17.662943825125694,
				speed : 2.598000049591064,
				time : new Date('2013-01-16T18:54:58.000Z'),
				altitude : 68.4000015258789
			}]);

		}
	},
	'Parse a image file' : {
		topic : function() {
			 tcx.tcxParseFile('./tests/data/loading.gif', this.callback);
		},
		'Should return an error ': function(err, result) {
			assert.equal(err != null, true);
			assert.equal(/Non-whitespace before first tag/.test(err.message), true);
		}
	},
	'Parse tcx URL' : {
		'topic' : function() {
			tcx.tcxParseURL(HOST + '/data.tcx', this.callback);
		},
		'Should return an array of two tracking points' : function(err, result) {
			assert.deepEqual(result, [{
				distance : 0,
				lat : null,
				lng : null,
				speed : 1.7480000257492068,
				time : new Date('2013-01-16T18:54:46.000Z'),
				altitude : 48.400001525878906
			}, {
				distance : 10.600000381469727,
				lat : 59.19330538250506,
				lng : 17.662933934479952,
				speed : 1.9600000381469729,
				time : new Date('2013-01-16T18:54:52.000Z'),
				altitude : 68.4000015258789
			}, {
				distance : 29.540000915527344,
				lat : 59.19347486458719,
				lng : 17.662943825125694,
				speed : 2.598000049591064,
				time : new Date('2013-01-16T18:54:58.000Z'),
				altitude : 68.4000015258789
			}]);
		}
	},
	'Parse bad tcx URL' : {
		'topic' : function() {
			tcx.tcxParseURL(HOST + '/bad.tcx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
		}
	},
	'Parse bad tcx URL which returns a soft 404' : {
		'topic' : function() {
			tcx.tcxParseURL(HOST + '/soft404.tcx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
		}
	},
	'Parse tcx URL which returns a broken xml' : {
		'topic' : function() {
			tcx.tcxParseURL(HOST + '/broken.tcx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
		}
	},
	'Parse image URL' : {
		'topic' : function() {
			tcx.tcxParseURL(HOST + '/image.tcx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
			assert.equal(/Non-whitespace before first tag/.test(err.message), true);
		}
	}
}).export(module)
