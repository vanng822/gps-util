
var assert = require('assert');

var gpx = require('../lib/gpx-parser.js');
var vows = require('vows');

vows.describe('Test suite for parsing gpx').addBatch({
	'Parse broken gpx data' : {
		topic : function() {
			gpx.gpxParse(['<gpx version="1.1">', '<metadata>', '<link href="connect.garmin.com">', '<text>Garmin Connect</text>', '</link>', '  <time>2013-03-02T15:40:32.000Z</time>', ' </metadata>', '<trk>', '<name>Untitled</name>', ' <trkseg>', '<trkpt lon="17.661922238767147" lat="59.19305333867669">', '<ele>69.4000015258789</ele>', '<time>2013-03-02T15:40:31.000Z</time>', '</trkpt>', '<trkpt lon="17.662122901529074" lat="59.192982176318765">', '<ele>69.5999984741211</ele>', ' <time>2013-03-02T15:40:38.000Z</time>', '</trkpt>', '</gpx>'].join(), this.callback)
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true)
		}
	},
	'Parse gpx data' : {
		'topic' : function() {
			gpx.gpxParse(['<gpx version="1.1">', '<metadata>', '<link href="connect.garmin.com">', '<text>Garmin Connect</text>', '</link>', '  <time>2013-03-02T15:40:32.000Z</time>', ' </metadata>', '<trk>', '<name>Untitled</name>', ' <trkseg>', '<trkpt lon="17.661922238767147" lat="59.19305333867669">', '<ele>69.4000015258789</ele>', '<time>2013-03-02T15:40:31.000Z</time>', '</trkpt>', '<trkpt lon="17.662122901529074" lat="59.192982176318765">', '<ele>69.5999984741211</ele>', ' <time>2013-03-02T15:40:38.000Z</time>', '</trkpt>', '</trkseg>', '</trk>', '</gpx>'].join(), this.callback);
		},
		'Should return an array of two tracking points' : function(err, result) {
			assert.deepEqual(result, [{
				distance: undefined,
				speed: undefined,
				lat : 59.19305333867669,
				lng : 17.661922238767147,
				ele : 69.4000015258789,
				time : new Date('2013-03-02T15:40:31.000Z')
			}, {
				distance: undefined,
				speed: undefined,
				lat : 59.192982176318765,
				lng : 17.662122901529074,
				ele : 69.5999984741211,
				time : new Date('2013-03-02T15:40:38.000Z')
			}]);
			
		}
	},
	'Parse gpx file data.gpx' : {
		'topic' : function() {
			gpx.gpxParseFile('./tests/data/data.gpx', this.callback);
		},
		'Should return an array of two tracking points' : function(err, result) {
			assert.deepEqual(result, [{
				distance: undefined,
				speed: undefined,
				lat : 59.19305333867669,
				lng : 17.661922238767147,
				ele : 69.4000015258789,
				time : new Date('2013-03-02T15:40:31.000Z')
			}, {
				distance: undefined,
				speed: undefined,
				lat : 59.192982176318765,
				lng : 17.662122901529074,
				ele : 69.5999984741211,
				time : new Date('2013-03-02T15:40:38.000Z')
			}]);
			
		}
	}
}).export(module)