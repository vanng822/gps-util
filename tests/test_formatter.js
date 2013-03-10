var assert = require('assert');

var formatter = require('../lib/formatter.js');
var vows = require('vows');

vows.describe('Test suite format converter').addBatch({
	'Given 40.7082 expected 40 degrees, 42 minutes and 29.52 seconds' : function() {
		assert.deepEqual(formatter.toDMS(40.7082), {
			minutes : 42,
			degrees : 40,
			seconds : 29.52
		});
	},
	'Give latitude 59.3333 expected 59° 19\' 59.88" N' : function() {
		assert.equal(formatter.getDMSLatitude(59.3333), '59° 19\' 59.88" N');
	},
	'Give longitude 18.05 expected 18° 3\' 0" E' : function() {
		assert.equal(formatter.getDMSLongitude(18.05), '18° 3\' 0" E');
	},
	'Given 18 degrees, 3 minutes and 0 second expected 18.05' : function() {
		assert.equal(formatter.toDD(18, 3, 0), 18.05);
	},
	'Given 40 degrees, 42 minutes and 29.52 seconds expected 40.7082' : function() {
		assert.equal(formatter.toDD(40, 42, 29.52), 40.7082);
	},
	'Given 59 degrees, 19 minutes and 59.88 seconds expected 59.3333' : function() {
		assert.equal(formatter.toDD(59, 19, 59.88), 59.3333);	
	}
}).export(module);
