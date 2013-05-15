var assert = require('assert');

var image = require('../lib/image.js');
var vows = require('vows');

vows.describe('Test suite for getting image gps info').addBatch({
	'when I parse an image without gps info' : {
		'topic' : function() {
			image.imageGpsInfo('./tests/data/loading.gif', this.callback);
		},
		'the returned data should be null' : function(err, result) {
			assert.equal(err, null);
			assert.equal(result, null);
		}
	},
	'when I parse an image taken at KTH with gps info' : {
		'topic' : function() {
			image.imageGpsInfo('./tests/data/kth.jpg', this.callback);
		},
		'the returned data should contain longitude: 18.073666666666668 and latitude: 59.347' : function(err, result) {
			assert.equal(err, null);
			assert.equal(result.GPSLatitude, 59.347);
			assert.equal(result.GPSLongitude, 18.073666666666668);
			assert.equal(result.GPSAltitude, 31.000372023809526);
			
			
		}
	}
}).export(module);
