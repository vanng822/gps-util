var assert = require('assert');

var geohash = require('../lib/geohash.js');;
var vows = require('vows');

vows.describe('Test suite geohash').addBatch({
	'Given u4pruydqqvj I should get estimated coordinate 57.64911,10.40744' : function() {
		var result = geohash.geohashDecode('u4pruydqqvj');
		assert.ok(Math.abs(57.64911 - result.latitude) < 0.00001);
		assert.ok(Math.abs(10.40744 - result.longitude) < 0.00001);
	},
	'Given ezs42 I should get estimated coordinate 42.6,-5.6' : function() {
		var result = geohash.geohashDecode('ezs42');
		assert.ok(Math.abs(42.6 - result.latitude) < 0.1);
		assert.ok(Math.abs(-5.6 - result.longitude) < 0.1);
	},
	'Given coordinate 57.64911,10.40744 I should get u4pruydqqvj with precision 11' : function() {
		var result = geohash.geohashEncode(57.64911,10.40744, 11);
		assert.equal(result, 'u4pruydqqvj');
	},
	'Given coordinate 57.64911,10.40744 I should get u4pruydqq with precision 9' : function() {
		var result = geohash.geohashEncode(57.64911,10.40744, 9);
		assert.equal(result, 'u4pruydqq');
	},
	'Given coordinate 57.64911,10.40744 I should get u4pruydqqvj8 with no given precision' : function() {
		var result = geohash.geohashEncode(57.64911,10.40744);
		assert.equal(result, 'u4pruydqqvj8');
	},
	'Given coordinate 59.328930, 18.064910 I should get u6sce0d2nfjh with no given precision' : function() {
		var result = geohash.geohashEncode(59.328930, 18.064910);
		assert.equal(result, 'u6sce0d2nfjh');	
	},
	'Given u4ouydh I should get an Error' : function() {
		assert.throws(function() {
			geohash.geohashDecode('u4ouydh');
		}, Error);
	}
}).export(module);

