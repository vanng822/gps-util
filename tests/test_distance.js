var assert = require('assert');

var calculator = require('../lib/distance.js');

var vows = require('vows');

vows.describe('Test suite distance').addBatch({
	'given points expected 13.899604253423052m from each other' : function() {
		assert.equal(calculator.getDistance(17.661922238767147, 59.19305333867669, 17.662122901529074, 59.192982176318765), 13.899604253423052);
	},
	'total distance of given points expected to be 60.29237674121896m' : function() {
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
			lat : 59.19288511388004,
			lng : 17.66255029477179
		}, {
			lat : 59.19290036894381,
			lng : 17.662896132096648
		}]), 60.29237674121896);
	},
	'Given coordinate I get a bounding box' : function() {
		var getDiff = function(lng, lat, r) {
			/* diagonal of the box compared to better appr distance */
			var box = calculator.getBoundingBox(lat, lng, r);
			var d = calculator.getDistance(box[0].lng, box[0].lat, box[1].lng, box[1].lat);
			var line = 2 * Math.sqrt(2) * r;
			var diff = Math.abs(line - d);
			//console.log(d, line, diff, box);
			return diff;
		}
		
		assert.ok(getDiff(2.333, 1.000, 20000) < 0.5);
		assert.ok(getDiff(59.3333, 18.05, 20000) < 0.5);
		assert.ok(getDiff(105.85, 21.0333, 20000) < 0.5);
		assert.ok(getDiff(105.85, 21.0333, 20000) < 0.5);
		assert.ok(getDiff(2.3522219000000177, 48.856614, 20000) < 0.5);
		assert.ok(getDiff(28.047305100000017, -26.2041028, 20000) < 0.5);
		assert.ok(getDiff(-74.0059731, 40.7143528, 20000) < 0.5);
		assert.ok(getDiff(100.52412349999997, 13.7278956, 20000) < 0.5);
	},
	'Given one point I should get the same point as midpoint' : function() {
		assert.deepEqual( calculator.getMidPoint([{
				lat : 59.19290036894381,
				lng : 17.662896132096648
			}]), {
				lat : 59.19290036894381,
				lng : 17.662896132096648
			});
	},
	'Given same point multi-times should get same midpoint' : function() {
		var point = {
				lat : 59.1929003689438,
				lng : 17.662896132096648
			};
				
		var result = calculator.getMidPoint([point,point,point]);
		assert.ok(Math.abs(point.lat - result.lat) < 0.000000000001);
		assert.ok(Math.abs(point.lng - result.lng) < 0.000000000001);
	},
	'Given 2 points should get midpoint in between' : function() {
		var point = {
				lat : 59.2,
				lng : 17.2
			};
		
		var point2 = {
				lat : 59.4,
				lng : 17.4
			};		
		var result = calculator.getMidPoint([point,point2]);
		assert.ok(Math.abs(59.3 - result.lat) < 0.01);
		assert.ok(Math.abs(17.3 - result.lng) < 0.01);
	}
}).export(module);
