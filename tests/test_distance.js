var assert = require('assert');

var calculator = require('../lib/distance.js');

var vows = require('vows');

vows.describe('Test suite distance').addBatch({
	'given points expected 13.899604253423052m from each other': function() {
		assert.equal(calculator.getDistance(17.661922238767147,59.19305333867669,17.662122901529074,59.192982176318765), 13.899604253423052);
	},
	'total distance of given points expected to be 60.29237674121896m': function() {
		assert.equal(calculator.getTotalDistance([{
				lat : 59.19305333867669,
				lng : 17.661922238767147,
				ele : 69.4000015258789,
				time : new Date('2013-03-02T15:40:31.000Z')
			}, {
				lat : 59.192982176318765,
				lng : 17.662122901529074,
				ele : 69.5999984741211,
				time : new Date('2013-03-02T15:40:38.000Z')
			}, {
				lat: 59.19288511388004,
				lng: 17.66255029477179
			},
			{
				lat: 59.19290036894381,
				lng: 17.662896132096648
			}]), 60.29237674121896);
	},
	/*'Given coordinate I get bounding box for radius of 40000m': function() {
		console.log(calculator.getBoundingBox(1.000, 2.333, 40000));
	}*/
})
.export(module);