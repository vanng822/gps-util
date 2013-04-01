var assert = require('assert');

var gpsUtil = require('../index.js');

var vows = require('vows');

var expectedExportedFunctionNames = ['getDMSLatitude',
			'getTotalDistance',
			'toDMS',
			'gpxParse',
			'getDistance',
			'toDD',
			'getDMSLongitude',
			'gpxParseFile',
			'tcxParse',
			'tcxParseFile',
			'getDiffInSecs',
			'RelativeTime',
			'calculateFromGPX'];

vows.describe('Test suite for exported functionalities').addBatch({
	'Exported function names' : function() {
		functionNames =  Object.keys(gpsUtil);
		functionNames.forEach(function(name) {
			assert.equal(expectedExportedFunctionNames.indexOf(name) != -1,true, name + ' was not in the exptected function names (expectedExportedFunctionNames)');
		});
	}
}).export(module);
