var assert = require('assert');

var calculator = require('../lib/distance-calculator.js');

var vows = require('vows');

vows.describe('Test suite distance').addBatch({
	'given points expected 13.899604253423052m from each other': function() {
		assert.equal(calculator.getDistance(17.661922238767147,59.19305333867669,17.662122901529074,59.192982176318765), 13.899604253423052);
	}
})
.export(module)