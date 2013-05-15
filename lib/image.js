var gm = require('gm');
var PROFILE_EXIF_KEY = 'Profile-EXIF';
var GPS_KEY_PATTERN = new RegExp('^GPS.*$');

var coordinate2degree = function(data) {
	var values = data.split(','), tmp;
	var degNum, degDenom, minNum, minDenom, secNum, secDenom;
	tmp = values[0].split('/');
	degNum = parseInt(tmp[0])
	degDenom = parseInt(tmp[1]);
	tmp = values[1].split('/');
	minNum = parseInt(tmp[0])
	minDenom = parseInt(tmp[1]);
	tmp = values[2].split('/');
	secNum = parseInt(tmp[0])
	secDenom = parseInt(tmp[1]);
	
	return (degNum / degDenom) + ( (minNum / minDenom) / 60 ) + ((secNum / secDenom) / 3600);
};

var converters = {
	'GPSLatitude' : function(data) {
		return coordinate2degree(data);
	},
	'GPSLongitude' : function(data) {
		return coordinate2degree(data);
	},
	'GPSAltitude' : function(data) {
		var values = data.split('/');
		return values[0]/values[1];
	},
	'GPSTimeStamp' : function(data) {
		return data;
	},
	'GPSImgDirection' : function(data) {
		return data;
	}
}

var fetchGpsInfo = function(data) {
	var gpsKeys, i, len, gpsData, key;
	try {
		if(data[PROFILE_EXIF_KEY]) {
			gpsData = {};
			gpsKeys = Object.keys(data[PROFILE_EXIF_KEY]);
			for( i = 0, len = gpsKeys.length; i < len; i++) {
				key = gpsKeys[i].replace(/ /g, '');
				if(GPS_KEY_PATTERN.test(gpsKeys[i])) {
					if(converters[key]) {
						gpsData[key] = converters[key](data[PROFILE_EXIF_KEY][gpsKeys[i]]);
					} else {
						gpsData[key] = data[PROFILE_EXIF_KEY][gpsKeys[i]];
					}
				}
			}
			return gpsData;
		}
	} catch(e) {

	}
	return null;
};
var imageGpsInfo = function(image, callback) {
	gm(image).identify(function(err, data) {
		if(err) {
			return callback(err, null);
		}
		callback(null, fetchGpsInfo(data));
	});
};

module.exports = {
	imageGpsInfo : imageGpsInfo
};
