var data2xml = require('data2xml');
var data2xmlConvert = data2xml();
var gpx = require('./gpx-parser.js');

var toGPX = function(trackingResult, callback, name) {
	var i, len, trkpts = [], started;
	var name = name || 'Untitled';
	len = trackingResult.points.length

	if(len > 0) {
		started = trackingResult.points[0].time.toISOString();
	} else {
		started = new Date().toISOString()
	}

	for( i = 0; i < len; i++) {
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
	try {
		result = data2xmlConvert('gpx', obj);
	} catch(e) {
		return callback(e, null);
	}
	callback(null, result);
};
var toTCX = function(trackingResult, callback, name) {
	var name = name || 'Untitled';
	throw new Error('Implement!');
};

var generateKml = function(coordinates, altitudeMode, lookAt) {
	var obj = {
		'Document' : {
			Style : {
				'LineStyle' : {
					'color' : 'C81400FF',
					'width' : 4
				},
				_attr : {
					'id' : 'red'
				}
			},
			'Folder' : {
				'Placemark' : {
					'styleUrl' : '#red',
					'LineString' : {
						'altitudeMode' : altitudeMode,
						'coordinates' : coordinates.join("\n")
					}
				}
			},
			'LookAt' : lookAt
		},
		_attr : {
			'xmlns' : 'http://www.opengis.net/kml/2.2',
			'xmlns:gx' : 'http://www.google.com/kml/ext/2.2',
			'xmlns:kml' : 'http://www.opengis.net/kml/2.2',
			'xmlns:atom' : 'http://www.w3.org/2005/Atom'
		}
	}
	return data2xmlConvert('kml', obj);
};

var toKml = function(points, callback) {
	var altitudeMode = 'clampToGround';
	var coordinates = [];
	var i, len, lookAt = {};
	len = points.length
	for( i = 0; i < len; i++) {
		coordinates.push(points[i].lng +',' + points[i].lat + ','+ points[i].ele);
	}
	if(len) {
		lookAt.longitude = points[0].lng;
		lookAt.latitude = points[0].lat;
		lookAt.altitude = 0;
		lookAt.heading = 0;
	}
	

	try {
		result = generateKml(coordinates, altitudeMode, lookAt);
	} catch(e) {
		return callback(e, null);
	}
	callback(null, result);
};


module.exports = {
	toGPX : toGPX,
	toKml : toKml
};
