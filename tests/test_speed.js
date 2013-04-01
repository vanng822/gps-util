var assert = require('assert');

var speed = require('../lib/speed.js');
var vows = require('vows');

vows.describe('Test suite speed').addBatch({
	'calculateSpeed(100, 2013-01-16T18:54:36.000Z, 2013-01-16T18:54:46.000Z) = 10m/s' : function() {
		assert.equal(speed.calculateSpeed(100, new Date('2013-01-16T18:54:36.000Z'), new Date('2013-01-16T18:54:46.000Z')), 10);
	},
	'calculateSpeed(100, 2013-01-16T18:54:46.000Z, 2013-01-16T18:54:46.000Z) = undefined' : function() {
		assert.equal(speed.calculateSpeed(100, new Date('2013-01-16T18:54:46.000Z'), new Date('2013-01-16T18:54:46.000Z')), undefined);
	},
	'convertSpeed 10 with not supported conversion type SDFDSFSDFDSFDSFSDFD => Error' : function() {
		assert.throws(function() {
			speed.convertSpeed(10, 'SDFDSFSDFDSFDSFSDFD');
		}, Error);
	},
	'convertSpeed 10 m/s => 36 km/h' : function() {
		assert.equal(speed.convertSpeed(10, speed.convertTypes.MPSec2KmPH), 36);
	},
	'convertSpeed 10 m/s => 22.36936292054402 mph' : function() {
		assert.equal(speed.convertSpeed(10, speed.convertTypes.MPSec2MPH), 22.36936292054402);
	},
	'convertSpeed 10 km/h => 2.7777777777777777 m/s' : function() {
		assert.equal(speed.convertSpeed(10, speed.convertTypes.KmPH2MPSec), 2.7777777777777777);
	},
	'convertSpeed 10 mph => 4.4704 m/s' : function() {
		assert.equal(speed.convertSpeed(10, speed.convertTypes.MPH2MPSec), 4.4704);
	},
	'calculatePace 10 with not supported type GSFRRWSSDWEWE => Error' : function() {
		assert.throws(function() {
			speed.calculatePace(10, 'GSFRRWSSDWEWE');
		}, Error);
	},
	'calculatePace 3 m/s => 05:33 / km' : function() {
		var result = speed.calculatePace(3, speed.calculatePaceTypes.PER_KM);
		assert.deepEqual(result, {
			hours : 0,
			minutes : 5,
			type : 'PER_KM',
			seconds : 33
		});
		assert.equal(String(result), '05:33 / km');
	},
	'calculatePace 3 m/s => 08:56 / mile' : function() {
		var result = speed.calculatePace(3, speed.calculatePaceTypes.PER_MILE);
		assert.deepEqual(result, {
			hours : 0,
			minutes : 8,
			type : 'PER_MILE',
			seconds : 56
		});
		assert.equal(String(result), '08:56 / mile');
	},
	'calculatePace 0.325 m/s => 01:22:32 / mile' : function() {
		var result = speed.calculatePace(0.325, speed.calculatePaceTypes.PER_MILE);
		assert.deepEqual(result, {
			hours : 1,
			minutes : 22,
			type : 'PER_MILE',
			seconds : 32
		});
		assert.equal(String(result), '01:22:32 / mile');
	}
	 
}).export(module);
