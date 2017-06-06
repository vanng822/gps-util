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
			let precision = 0.0000000000001;
			assert.equal(err, null);
			assert.equal(result.points.length, 20);
			assert.ok(Math.abs(result.averageSpeed - 4.450676859448075) < precision);
			assert.ok(Math.abs(result.fastestSpeed - 6.96311967571195) < precision);
			assert.ok(Math.abs(result.slowestSpeed - 1.7153931748868099) < precision);
			assert.ok(Math.abs(result.totalDistance -  396.11024049087865) < precision);
			assert.equal(result.totalTime, 89);

			let point2 = result.points[2];
			assert.ok(Math.abs(point2.lat - 59.18158857151866) < precision);
			assert.ok(Math.abs(point2.lng - 17.673767544329166) < precision);
			assert.ok(Math.abs(point2.ele - 33.400001525878906) < precision);
			assert.ok(Math.abs(point2.speed - 4.221760443523958) < precision);
			assert.ok(Math.abs(point2.distance - 34.83194761671427) < precision);
			assert.deepEqual(point2.time, new Date('2012-04-28T16:04:39.000Z'));

			let point18 = result.points[18];
			assert.ok(Math.abs(point18.lat - 59.182679979130626) < precision);
			assert.ok(Math.abs(point18.lng - 17.67968793399632) < precision);
			assert.ok(Math.abs(point18.ele - 30.200000762939453) < precision);
			assert.ok(Math.abs(point18.speed - 4.084766149733331) < precision);
			assert.ok(Math.abs(point18.distance - 393.5258418687884) < precision);
			assert.deepEqual(point18.time, new Date('2012-04-28T16:05:54.000Z'));
		}
	},
	'Given 2 points in the test data set from gpx file' : {
		topic : function() {
			var self = this;
			gpx.gpxParseFile('./tests/data/calc_data.gpx', function(err, result) {
				calc.calculateFromGPX(result, function(err, result) {
					self.callback(err, result);
				}, 11, 14);
			});
		},
		'expected new distance, total time and average speed' : function(err, result) {
			assert.equal(err, null);
			assert.equal(result.points.length, 4);
			assert.equal(result.averageSpeed, 4.616550632388868);
			assert.equal(result.fastestSpeed, 4.76741568467487);
			assert.equal(result.slowestSpeed, 4.412141843415082);
			assert.equal(result.totalDistance, 69.24825948583302);
			assert.equal(result.totalTime, 15);

			assert.deepEqual(result.points, [{
				distance : 0,
				lat : 59.18222274631262,
				ele : 31.200000762939453,
				lng : 17.677201442420483,
				speed : 4.412141843415082,
				time : new Date('2012-04-28T16:05:21.000Z')
			}, {
				distance : 22.060709217075413,
				lat : 59.18229365721345,
				ele : 31.200000762939453,
				lng : 17.677563121542335,
				speed : 4.412141843415082,
				time : new Date('2012-04-28T16:05:26.000Z')
			}, {
				distance : 45.897787640449764,
				lat : 59.18236054480076,
				ele : 31.200000762939453,
				lng : 17.67796067520976,
				speed : 4.76741568467487,
				time : new Date('2012-04-28T16:05:31.000Z')
			}, {
				distance : 69.24825948583302,
				lat : 59.18242609128356,
				ele : 31.200000762939453,
				lng : 17.67835009843111,
				speed : 4.670094369076649,
				time : new Date('2012-04-28T16:05:36.000Z')
			}]);
		}
	},
	'Given same point in the test data set from gpx file' : {
		topic : function() {
			var self = this;
			gpx.gpxParseFile('./tests/data/calc_data.gpx', function(err, result) {
				calc.calculateFromGPX(result, function(err, result) {
					self.callback(err, result);
				}, 11, 11);
			});
		},
		'expected an Error' : function(err, result) {
			assert.ok(err !== null);
			assert.ok(result === null);
		}
	},
	'Given one point test data set' : {
		topic : function() {
			calc.calculateFromGPX([{
				lat : 59.18149243108928,
				lng : 17.673185924068093,
				ele : 33.400001525878906,
				time : new Date('2012-04-28T16:05:36.000Z'),
				speed : undefined,
				distance : undefined
			}], this.callback);
		},
		'expected an Error' : function(err, result) {
			assert.ok(err !== null);
			assert.ok(result === null);
		}
	}
}).export(module);
