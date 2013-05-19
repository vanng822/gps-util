var exiftool = require('./exiftool');
var imageGpsInfo = function(image, callback) {
	return exiftool(image, callback);
};

var removeGPSInfo = function(image, callback) {
	return exiftool.delAll(image, callback);
};

module.exports = {
	imageGpsInfo : imageGpsInfo,
	removeGPSInfo : removeGPSInfo
};
