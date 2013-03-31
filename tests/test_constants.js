var assert = require('assert');

var constants = require('../lib/constants.js');
var vows = require('vows');

vows.describe('Test suite constants').addBatch({
	'One mile is expected to be 1609.344 meters' : function() {
		assert.equal(constants.MILE_IN_METERS, 1609.344);
	}
}).export(module);
