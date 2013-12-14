
var exportLibs = function(exports /*libs to include */) {
	var feature, i, len, libfeatures, libname, obj;
	
	for(i = 1, len = arguments.length; i < len; i++) {
		libname = arguments[i];
		libfeatures = require('./lib/' + libname + '.js');
		obj = exports;
		if (libfeatures.__namespace__ && libfeatures.__namespace__ != "") {
			if (!obj.hasOwnProperty(libfeatures.__namespace__)) {
				obj[libfeatures.__namespace__] = {};
			}
			obj = obj[libfeatures.__namespace__];
		}
		for(feature in libfeatures) {
			if (feature == '__namespace__') {
				continue;
			}
			if (obj.hasOwnProperty(feature)) {
				throw new Error('Feature exists: ' + feature);
			}
			obj[feature] = libfeatures[feature];
		}
	}
	return exports;
};

exportLibs(module.exports, 'distance', 'formatter', 'gpx-parser', 'tcx-parser', 'time', 'calc', 'creator', 'image', 'geohash');