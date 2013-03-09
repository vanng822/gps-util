
var EARTH_RADIUS = 6371000;

var toRad = function(decDegrees) {
	return decDegrees * Math.PI / 180;
};

var getDistance = function(lng1, lat1, lng2, lat2) {
	var dLat = toRad(lat2 - lat1);
	var dLng = toRad(lng2 - lng1);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) 
		+ Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(toRad(lat1)) * Math.cos(toRad(lat2));
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return c * EARTH_RADIUS;
};


module.exports = {
	getDistance : getDistance
}
