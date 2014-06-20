var EARTH_RADIUS = 6371000;
var MIN_LNG = - Math.PI, MAX_LNG = Math.PI, MIN_LAT = - Math.PI / 2, MAX_LAT = Math.PI / 2;

var toRad = function(decDegrees) {
	return decDegrees * Math.PI / 180;
};
var toDegrees = function(radians) {
	return (180 * radians) / Math.PI
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
/**
 * http://JanMatuschek.de/LatitudeLongitudeBoundingCoordinates
 */
var getBoundingBox = function(lat, lng, distance) {
	var minLat, maxLat, minLng, maxLng;
	var deltaLng;
	var radDist = distance / EARTH_RADIUS;
	var radLat = toRad(lat), radLng = toRad(lng);
	
	minLat = radLat - radDist;
	maxLat = radLat + radDist;

	if(minLat > MIN_LAT && maxLat < MAX_LAT) {
		deltaLng = Math.asin(Math.sin(radDist) / Math.cos(radLat));
		minLng = radLng - deltaLng;
		if(minLng < MIN_LNG) {
			minLng += 2 * Math.PI;
		}
		maxLng = radLng + deltaLng;
		if(maxLng > MAX_LNG) {
			maxLng -= 2 * Math.PI;
		}
	} else {
		minLat = Math.max(minLat, MIN_LAT);
		maxLat = Math.min(maxLat, MAX_LAT);
		minLng = MIN_LNG;
		maxLng = MAX_LNG;
	}
	return [
		{lat: toDegrees(minLat), lng: toDegrees(minLng)}, // Southwest
		{lat: toDegrees(maxLat), lng: toDegrees(maxLng)} // Northeast
	];
};

var getMidPoint = function(points) {
	var len = points.length, x = 0, y = 0, z = 0;
	var i, lat, lng;
	if (len < 1) {
		throw new Error('Points must not be empty');
	} else if (len == 1) {
		return points[0];
	}
	
	for (i = 0; i < len; i++) {
		lat = toRad(points[i].lat);
		lng = toRad(points[i].lng);
		x += Math.cos(lat) * Math.cos(lng);
		y += Math.cos(lat) * Math.sin(lng);
		z += Math.sin(lat);
	}
	x = x / len;
	y = y / len;
	z = z / len;
	lng = Math.atan2(y, x);
	lat = Math.atan2(z, Math.sqrt(x * x + y * y));
	
	return {lat: toDegrees(lat), lng: toDegrees(lng) };
};

module.exports = {
	getDistance : getDistance,
	getTotalDistance : getTotalDistance,
	getBoundingBox : getBoundingBox,
	getMidPoint : getMidPoint
};
