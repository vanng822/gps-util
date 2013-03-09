var EARTH_RADIUS = 6371000;

var toRad = function(decDegrees) {
	return decDegrees * Math.PI / 180;
};
var getDistance = function(lng1, lat1, lng2, lat2) {
	var a, c, dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
	a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(toRad(lat1)) * Math.cos(toRad(lat2));
	c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return c * EARTH_RADIUS;
};
var getTotalDistance = function(points) {
	var i, len, total = 0;
	for( i = 0, len = points.length - 1; i < len; i++) {
		total += getDistance(points[i].lng, points[i].lat, points[i + 1].lng, points[i + 1].lat);
	}

	return total;
};

module.exports = {
	getDistance : getDistance,
	getTotalDistance : getTotalDistance
}