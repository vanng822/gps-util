var assert = require('assert');

var image = require('../lib/image.js');
var vows = require('vows');
var fs = require('fs');

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
			assert.equal(result.GPSAltitude, 31);	
		}
	},
	'delete gps info on an image' : {
		'topic' : function() {
			fs.createReadStream('./tests/data/kth.jpg').pipe(fs.createWriteStream('./tests/data/kth.del.jpg'));
			image.removeGPSInfo('./tests/data/kth.del.jpg', this.callback);
		},
		'it should be success': function(err, success) {
			assert.equal(err, null);
			assert.equal(success, true);
		},
		'and when I try to get gps info from this image': {
			'topic' : function(err, success) {
				image.imageGpsInfo('./tests/data/kth.del.jpg', this.callback);
			},
			'it should return null' : function(err, result) {
				assert.equal(err, null);
				assert.equal(result, null);
				fs.unlink('./tests/data/kth.del.jpg');
			}
		}
	},
	'When I copy image using fs' : {
		'topic': function() {
			fs.createReadStream('./tests/data/kth.jpg').pipe(fs.createWriteStream('./tests/data/kth.del2.jpg'));
			image.imageGpsInfo('./tests/data/kth.del2.jpg', this.callback);
		},
		'it should reserve gps info': function(err, result) {
			assert.equal(err, null);
			assert.equal(result.GPSLatitude, 59.347);
			assert.equal(result.GPSLongitude, 18.073666666666668);
			assert.equal(result.GPSAltitude, 31);
			fs.unlink('./tests/data/kth.del2.jpg');
		}
	}
}).export(module);
