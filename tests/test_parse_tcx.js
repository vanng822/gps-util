var assert = require('assert');

var tcx = require('../lib/tcx-parser.js');
var vows = require('vows');

vows.describe('Test suite for parsing tcx').addBatch({
	'Parse broken tcx data' : {
		topic : function() {
			tcx.tcxParse('<?xml version="1.0" encoding="UTF-8"?><TrainingCenterDatabase><Activities><Activity Sport="Running"></TrainingCenterDatabase>', this.callback)
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true)
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
	}
}).export(module)