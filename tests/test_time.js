var assert = require('assert');
var time = require('../lib/time');
var vows = require('vows');

vows.describe('Test suite for time functions').addBatch({
	'getDiffInSecs(2013-01-16T18:53:06.000Z, 2013-01-16T18:54:46.000Z) => 100s' : function() {
		assert.equal(time.getDiffInSecs( new Date('2013-01-16T18:53:06.000Z'), new Date('2013-01-16T18:54:46.000Z')), 100);
	},
	'RelativeTime(100) => 01:40 when casting to string' : function() {
		assert.equal(String(new time.RelativeTime(100)), '01:40');
	},
	'RelativeTime(3700) => 01:01:40 when casting to string' : function() {
		assert.equal(String(new time.RelativeTime(3700)), '01:01:40');
	},
	'RelativeTime(45) => 00:45 when casting to string' : function() {
		assert.equal(String(new time.RelativeTime(45)), '00:45');
	}
}).export(module);
