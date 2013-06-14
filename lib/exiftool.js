var exec = require('child_process').exec;
var shelly = require('shelly');
var exiftoolExec = 'exiftool';

var coordinate2degree = function(data) {
	var values = data.split(',');
	var deg = parseFloat(values[0]), min = parseFloat(values[1]), sec = parseFloat(values[2]);

	return deg + (min / 60 ) + (sec / 3600);
};
var getLatitudeSign = function(ref) {
	if(ref == 'W')
		return -1;
	return 1;
};
var getLongitudeSign = function(ref) {
	if(ref == 'S')
		return -1;
	return 1;
};
var converters = {
	'GPSLatitude' : function(data) {
		return coordinate2degree(data);
	},
	'GPSLongitude' : function(data) {
		return coordinate2degree(data);
	},
	'GPSAltitude' : function(data) {
		return parseInt(data);
	},
	'GPSTimeStamp' : function(data) {
		return data;
	},
	'GPSImgDirection' : function(data) {
		return data;
	},
	'GPSLatitudeRef' : function(data) {
		if(data == 'North') {
			return 'N';
		}
		return 'S';
	},
	'GPSLongitudeRef' : function(data) {
		if(data == 'East') {
			return 'E';
		}
		return 'W';
	}
}

var fetchGpsInfo = function(data) {
	var gpsKeys, i, len, gpsData, key;
	try {
		gpsData = {};
		gpsKeys = Object.keys(data);
		for( i = 0, len = gpsKeys.length; i < len; i++) {
			if(converters[gpsKeys[i]]) {
				gpsData[gpsKeys[i]] = converters[gpsKeys[i]](data[gpsKeys[i]]);
			} else {
				gpsData[gpsKeys[i]] = data[gpsKeys[i]];
			}
		}
		if(gpsData['GPSLatitude'] && gpsData['GPSLatitudeRef']) {
			gpsData['GPSLatitude'] *= getLatitudeSign(gpsData['GPSLatitudeRef']);
		}
		if(gpsData['GPSLongitude'] && gpsData['GPSLongitudeRef']) {
			gpsData['GPSLongitude'] *= getLongitudeSign(gpsData['GPSLongitudeRef']);
		}
		return gpsData;
	} catch(e) {
		console.error(e);
	}
	return null;
};

module.exports = function(file, callback) {
	var cmd = shelly("? -lang en -j -c '%d,%d,%.15f,' '-GPS*' ?", exiftoolExec, file);
	exec(cmd, function(err, result) {
		try {
			result = JSON.parse(result);
			result = result[0];
		} catch(e) {
			return callback(e, null);
		}

		if(result.hasOwnProperty('GPSLatitude')) {
			return callback(null, fetchGpsInfo(result));
		}

		return callback(null, null);
	});
};

module.exports.delAll = function(file, callback) {
	var cmd = shelly('? -lang en -gps:all= ?', exiftoolExec, file);
	exec(cmd, function(err, result) {
		if(err) {
			return callback(err, null);
		}

		callback(null, result.trim() == '1 image files updated');
	});
};
