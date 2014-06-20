var assert = require('assert');

var gpsUtil = require('../index.js');

var vows = require('vows');

var expectedExportedFunctionNames = ['getDMSLatitude',
			'getTotalDistance',
			'toDMS',
			'gpxParse',
			'getDistance',
			'getBoundingBox',
			'getMidPoint',
			'toDD',
			'getDMSLongitude',
			'gpxParseFile',
      		'gpxParseURL',
			'tcxParse',
			'tcxParseFile',
			'tcxParseURL',
			'getDiffInSecs',
			'RelativeTime',
			'calculateFromGPX',
			'calculateFromTCX',
			'toGPX',
			'toKml',
			'imageGpsInfo',
			'removeGPSInfo',
			'geohashDecode',
			'geohashEncode'];

vows.describe('Test suite for exported functionalities').addBatch({
	'Exported function names' : function() {
		functionNames =  Object.keys(gpsUtil);
		assert.equal(functionNames.length, expectedExportedFunctionNames.length);
		functionNames.forEach(function(name) {
			assert.equal(expectedExportedFunctionNames.indexOf(name) != -1,true, name + ' was not in the exptected function names (expectedExportedFunctionNames)');
		});
	}
}).export(module);
