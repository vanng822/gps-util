var data2xml = require('data2xml');
var data2xmlConvert = data2xml();

var toGPX = function(trackingResult, callback, name) {
	var i, len, trkpts = [], started;
	var name = name || 'Untitled';
	len = trackingResult.points.length
	
	if (len > 0) {
		started = trackingResult.points[0].time.toISOString();
	} else {
		started = new Date().toISOString()
	}
	
	for( i = 0, len; i < len; i++) {
		trkpts.push({
			ele : trackingResult.points[i].ele,
			time : trackingResult.points[i].time.toISOString(),
			_attr : {
				lat : trackingResult.points[i].lat,
				lon : trackingResult.points[i].lng
			}
		});
	}

	var obj = {
		trk : {
			name : name,
			time : started,
			trkseg : {
				trkpt : trkpts
			}
		},
		_attr : {
			'version' : '1.1',
			'creator' : 'gps-util - https://github.com/vanng822/gps-util',
			'xmlns:xsi' : 'http://www.w3.org/2001/XMLSchema-instance',
			'xmlns' : 'http://www.topografix.com/GPX/1/1',
			'xsi:schemaLocation' : 'http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd',
			'xmlns:gpxtpx' : 'http://www.garmin.com/xmlschemas/TrackPointExtension/v1'
		}
	};
	
	callback(null, data2xmlConvert('gpx', obj));
};
var toTCX = function(trackingResult, callback, name) {
	var name = name || 'Untitled';
	throw new Error('Implement!');
};

module.exports = {
	toGPX : toGPX
};
