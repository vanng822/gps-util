var assert = require('assert');

var gpx = require('../lib/gpx-parser.js');
var vows = require('vows');
var nock = require('nock');
/* For testing url based gpx data */
var http = require('http');
var fs = require('fs');
var HOST = 'http://fakedomain.tld';
fs.readFile('./tests/data/data.gpx', function(err, data) {
	if(err) {
		throw err;
	}
	nock(HOST)
	.get('/data.gpx')
	.reply(200, data, {
		'Content-Type' : 'application/xml'
	});
});
nock(HOST)
.get('/bad.gpx')
.reply(404, 'Hey bad request!',{
	'Content-Type' : 'text/html'
});

nock(HOST)
.get('/soft404.gpx')
.reply(200, 'This is a soft 404 which has 200 as status code',{
	'Content-Type' : 'text/xml'
});

nock(HOST)
.get('/broken.tcx')
.reply(200, ['<gpx version="1.1">', '<metadata>', '<link href="connect.garmin.com">', '<text>Garmin Connect</text>', '</link>', '  <time>2013-03-02T15:40:32.000Z</time>', ' </metadata>', '<trk>', '<name>Untitled</name>', ' <trkseg>', '<trkpt lon="17.661922238767147" lat="59.19305333867669">', '<ele>69.4000015258789</ele>', '<time>2013-03-02T15:40:31.000Z</time>', '</trkpt>', '<trkpt lon="17.662122901529074" lat="59.192982176318765">', '<ele>69.5999984741211</ele>', ' <time>2013-03-02T15:40:38.000Z</time>', '</trkpt>', '</gpx>'].join(),{
	'Content-Type' : 'text/xml'
});


fs.readFile('./tests/data/loading.gif', function(err, data) {
	if(err) {
		throw err;
	}
	nock(HOST)
	.get('/image.gpx')
	.reply(200, data,{
		'Content-Type' : 'application/xml'
	});
});

vows.describe('Test suite for parsing gpx').addBatch({
	'Parse broken gpx data' : {
		topic : function() {
			gpx.gpxParse(['<gpx version="1.1">', '<metadata>', '<link href="connect.garmin.com">', '<text>Garmin Connect</text>', '</link>', '  <time>2013-03-02T15:40:32.000Z</time>', ' </metadata>', '<trk>', '<name>Untitled</name>', ' <trkseg>', '<trkpt lon="17.661922238767147" lat="59.19305333867669">', '<ele>69.4000015258789</ele>', '<time>2013-03-02T15:40:31.000Z</time>', '</trkpt>', '<trkpt lon="17.662122901529074" lat="59.192982176318765">', '<ele>69.5999984741211</ele>', ' <time>2013-03-02T15:40:38.000Z</time>', '</trkpt>', '</gpx>'].join(), this.callback);
		},
		'should return an error' : function(err, result) {
			assert.equal(err != null, true);
			assert.equal(result == null, true);
		}
	},
	'Parse valid xml but wrong format' : {
		topic : function() {
			gpx.gpxParse('<?xml version="1.0" encoding="UTF-8"?><TrainingCenterDatabase></TrainingCenterDatabase>', this.callback);
		},
		'should return an error' : function(err, result) {
			assert.equal(err != null, true);
			assert.equal(result == null, true);
		}
	},
	'Parse gpx data should return an array of two tracking points' : function() {
		gpx.gpxParse(['<gpx version="1.1">', '<metadata>', '<link href="connect.garmin.com">', '<text>Garmin Connect</text>', '</link>', '  <time>2013-03-02T15:40:32.000Z</time>', ' </metadata>', '<trk>', '<name>Untitled</name>', ' <trkseg>', '<trkpt lon="17.661922238767147" lat="59.19305333867669">', '<ele>69.4000015258789</ele>', '<time>2013-03-02T15:40:31.000Z</time>', '</trkpt>', '<trkpt lon="17.662122901529074" lat="59.192982176318765">', '<ele>69.5999984741211</ele>', ' <time>2013-03-02T15:40:38.000Z</time>', '</trkpt>', '</trkseg>', '</trk>', '</gpx>'].join(), function(err, result) {
			assert.deepEqual(result, [{
				distance : undefined,
				speed : undefined,
				lat : 59.19305333867669,
				lng : 17.661922238767147,
				ele : 69.4000015258789,
				time : new Date('2013-03-02T15:40:31.000Z')
			}, {
				distance : undefined,
				speed : undefined,
				lat : 59.192982176318765,
				lng : 17.662122901529074,
				ele : 69.5999984741211,
				time : new Date('2013-03-02T15:40:38.000Z')
			}]);
		});
	},
	'Parse gpx data should return an array of two tracking points null time' : function() {
		gpx.gpxParse(['<gpx version="1.1">', '<metadata>', '<link href="connect.garmin.com">', '<text>Garmin Connect</text>', '</link>', '  <time>2013-03-02T15:40:32.000Z</time>', ' </metadata>', '<trk>', '<name>Untitled</name>', ' <trkseg>', '<trkpt lon="17.661922238767147" lat="59.19305333867669">', '<ele>69.4000015258789</ele>', '</trkpt>', '<trkpt lon="17.662122901529074" lat="59.192982176318765">', '<ele>69.5999984741211</ele>', '</trkpt>', '</trkseg>', '</trk>', '</gpx>'].join(), function(err, result) {
			assert.deepEqual(result, [{
				distance : undefined,
				speed : undefined,
				lat : 59.19305333867669,
				lng : 17.661922238767147,
				ele : 69.4000015258789,
				time : null
			}, {
				distance : undefined,
				speed : undefined,
				lat : 59.192982176318765,
				lng : 17.662122901529074,
				ele : 69.5999984741211,
				time : null
			}]);
		});
	},
	'Parse gpx file data.gpx' : {
		'topic' : function() {
			gpx.gpxParseFile('./tests/data/data.gpx', this.callback);
		},
		'Should return an array of two tracking points' : function(err, result) {
			assert.deepEqual(result, [{
				distance : undefined,
				speed : undefined,
				lat : 59.19305333867669,
				lng : 17.661922238767147,
				ele : 69.4000015258789,
				time : new Date('2013-03-02T15:40:31.000Z')
			}, {
				distance : undefined,
				speed : undefined,
				lat : 59.192982176318765,
				lng : 17.662122901529074,
				ele : 69.5999984741211,
				time : new Date('2013-03-02T15:40:38.000Z')
			}]);
		}
	},
	'Parse a image file' : {
		topic : function() {
			 gpx.gpxParseFile('./tests/data/loading.gif', this.callback);
		},
		'Should return an error ': function(err, result) {
			assert.equal(err != null, true);
			assert.equal(/Non-whitespace before first tag/.test(err.message), true);
		}
	},
	'Parse gpx URL' : {
		'topic' : function() {
			gpx.gpxParseURL(HOST + '/data.gpx', this.callback);
		},
		'Should return an array of two tracking points' : function(err, result) {
			assert.deepEqual(result, [{
				distance : undefined,
				speed : undefined,
				lat : 59.19305333867669,
				lng : 17.661922238767147,
				ele : 69.4000015258789,
				time : new Date('2013-03-02T15:40:31.000Z')
			}, {
				distance : undefined,
				speed : undefined,
				lat : 59.192982176318765,
				lng : 17.662122901529074,
				ele : 69.5999984741211,
				time : new Date('2013-03-02T15:40:38.000Z')
			}]);
		}
	},
	'Parse bad gpx URL' : {
		'topic' : function() {
			gpx.gpxParseURL(HOST + '/bad.gpx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
		}
	},
	'Parse bad gpx URL which returns a soft 404' : {
		'topic' : function() {
			gpx.gpxParseURL(HOST + '/soft404.gpx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
		}
	},
	'Parse gpx URL which returns a broken xml' : {
		'topic' : function() {
			gpx.gpxParseURL(HOST + '/broken.gpx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
		}
	},
	'Parse image URL' : {
		'topic' : function() {
			gpx.gpxParseURL(HOST + '/image.gpx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
			assert.equal(/Non-whitespace before first tag/.test(err.message), true);
		}
	}
}).export(module)
