var assert = require('assert');

var formatter = require('../lib/formatter.js');
var vows = require('vows');

vows.describe('Test suite format converter').addBatch({
	'Given 40.7082 expected 40 degrees, 42 minutes and 29.5 seconds' : function() {
		assert.deepEqual(formatter.toDD(40.7082), {
			minutes : 42,
			degrees : 40,
			seconds : 29.5
		});
	},
	'Give latitude 59.3333 expected 59° 19\' 59.9" N' : function() {
		assert.equal(formatter.getDDLatitude(59.3333), '59° 19\' 59.9" N');
	},
	'Give longitude 18.05 expected 18° 3\' 0" E' : function() {
		assert.equal(formatter.getDDLongitude(18.05), '18° 3\' 0" E');
	}
}).export(module);
