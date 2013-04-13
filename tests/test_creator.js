var assert = require('assert');

var creator = require('../lib/creator.js');
var vows = require('vows');

vows.describe('Test suite for creator').addBatch({
	'Given tracking result' : {
		topic : function() {
			result = {
				points : [],
				averageSpeed : 120, // dummy
				fastestSpeed : 140, // dummy
				slowestSpeed : 100, // dummy
				/* Pace can be converted from speed */
				totalDistance : 0, // dummy
				totalTime : 0 // dummy
			}

			result.points = [{
				lat : 59.19305333867669,
				lng : 17.661922238767147,
				ele : 69.4000015258789,
				time : new Date('2013-03-02T15:40:31.000Z'),
				speed : 4.221760443523958, // dummy
				distance : 34.83194761671427 // dummy
			}, {
				lat : 59.192982176318765,
				lng : 17.662122901529074,
				ele : 69.5999984741211,
				time : new Date('2013-03-02T15:40:38.000Z'),
				speed : 4.084766149733331,
				distance : 393.5258418687884
			}];

			creator.toGPX(result, this.callback, 'My tracking gpx');
		},
		'should get a xml string in gpx format' : function(err, result) {
			var expected = '<?xml version="1.0" encoding="utf-8"?>';
			expected += "\n";
			expected += '<gpx version="1.1" creator="gps-util - https://github.com/vanng822/gps-util" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" xmlns:gpxtpx="http://www.garmin.com/xmlschemas/TrackPointExtension/v1"><trk><name>My tracking gpx</name><time>2013-03-02T15:40:31.000Z</time><trkseg><trkpt lat="59.19305333867669" lon="17.661922238767147"><ele>69.4000015258789</ele><time>2013-03-02T15:40:31.000Z</time></trkpt><trkpt lat="59.192982176318765" lon="17.662122901529074"><ele>69.5999984741211</ele><time>2013-03-02T15:40:38.000Z</time></trkpt></trkseg></trk></gpx>';
			
			assert.equal(result,expected);
		}
	}
}).export(module);
