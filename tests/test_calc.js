var assert = require('assert');

var gpx = require('../lib/gpx-parser.js');
var calc = require('../lib/calc.js');
var time = require('../lib/time');
var vows = require('vows');

vows.describe('Test suite for calc').addBatch({
	'Calculate speed and distance for gpx' : {
		'topic' : function() {
			var self = this;
			gpx.gpxParseFile('./tests/data/calc_data.gpx', function(err, result) {
				calc.calculateFromGPX(result, function(err, result) {
					self.callback(err, result);
				});
			});
		},
		'expected result from calculateFromGPX' : function(err, result) {
			assert.equal(err, null);
			assert.equal(result.points.length, 20);
			assert.equal(result.averageSpeed, 4.450676859448075);
			assert.equal(result.fastestSpeed, 6.96311967571195);
			assert.equal(result.slowestSpeed, 1.7153931748868099);
			assert.equal(result.totalDistance, 396.11024049087865);
			assert.equal(result.totalTime, 89);

			assert.deepEqual(result.points[2], {
				lat : 59.18158857151866,
				lng : 17.673767544329166,
				ele : 33.400001525878906,
				time : new Date('2012-04-28T16:04:39.000Z'),
				speed : 4.221760443523958,
				distance : 34.83194761671427
			})
			assert.deepEqual(result.points[18], {
				lat : 59.182679979130626,
				lng : 17.67968793399632,
				ele : 30.200000762939453,
				time : new Date('2012-04-28T16:05:54.000Z'),
				speed : 4.084766149733331,
				distance : 393.5258418687884
			});
		}
	}
}).export(module);
