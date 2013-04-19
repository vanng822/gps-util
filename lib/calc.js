var time = require('./time');
var speed = require('./speed');
var distance = require('./distance');

var Trackpoint = function() {
	this.lat = null;
	this.lng = null;
	this.ele = null;
	this.time = null;
	this.speed = undefined;
	this.distance = undefined;
};

Trackpoint.copy = function(tp) {
	var ctp = new Trackpoint();
	ctp.lat = tp.lat;
	ctp.lng = tp.lng;
	ctp.time = tp.time;
	ctp.speed = tp.speed;
	ctp.distance = tp.distance;
	if(tp.altitude) {
		/* TODO this is not true */
		ctp.ele = tp.altitude;
	} else if(tp.ele) {
		ctp.ele = tp.ele;
	}

	return ctp;
};
var TrackingResult = function() {
	this.points = [];
	this.averageSpeed = undefined;
	this.fastestSpeed = undefined;
	this.slowestSpeed = undefined;
	/* Pace can be converted from speed */
	this.totalDistance = 0;
	this.totalTime = 0;
};
/**
 * Calculate speed and distance
 * 
 * First point assumed same speed as the second point
 *
 * TODO: calculate based on more than 2 points for better values
 *
 */
var calculateFromGPX = function(points, callback, fromIndex, toIndex) {
	var i, len, index, currentDistance, currentSpeed, fastestSpeed = 0, slowestSpeed = 100000000;
	var result;
	len = points.length - 1;
	i = 0;
	if(fromIndex && fromIndex > 0 && fromIndex < len) {
		i = fromIndex;
	}
	if(toIndex && toIndex < len) {
		len = toIndex;
	}
	if(points.length < 2 || len - i < 2) {
		return callback(new Error('Result can not be calculated properly with data points less than 2'), null);
	}

	try {
		result = new TrackingResult();
		index = 0;
		result.points[index] = Trackpoint.copy(points[i]);
		result.points[index].distance = 0;
		for(; i < len; i++, index++) {
			result.points[index + 1] = Trackpoint.copy(points[i + 1]);
			currentDistance = distance.getDistance(result.points[index].lng, result.points[index].lat, result.points[index + 1].lng, result.points[index + 1].lat);
			currentSpeed = speed.calculateSpeed(currentDistance, result.points[index].time, result.points[index + 1].time);
			result.totalDistance += currentDistance;
			result.points[index + 1].distance = result.points[index].distance + currentDistance;
			result.points[index + 1].speed = currentSpeed;
			if(currentSpeed > fastestSpeed) {
				fastestSpeed = currentSpeed;
			}
			if(currentSpeed < slowestSpeed) {
				slowestSpeed = currentSpeed;
			}
		}
		result.points[0].speed = result.points[1].speed;
		result.averageSpeed = speed.calculateSpeed(result.totalDistance, result.points[0].time, result.points[index].time);
		result.fastestSpeed = fastestSpeed;
		result.slowestSpeed = slowestSpeed;
		result.totalTime = time.getDiffInSecs(result.points[0].time, result.points[index].time);
		callback(null, result);
	} catch(e) {
		callback(e, null);
	}
};

/**
 * Calculate speed and distance
 * 
 * Same way as GPX
 *
 */
var calculateFromTCX = function(points, callback, fromIndex, toIndex) {
	var newPoints = [], i, len;
	try {
		for (i = 0, len = points.length; i < len; i++) {
			if (!points[i].lat || !points[i].lng) {
				continue;
			}
			newPoints.push(points[i]);
		}
		calculateFromGPX(newPoints, callback, fromIndex, toIndex);
	} catch(e) {
		callback(e, null);
	}
};


module.exports = {
	calculateFromGPX : calculateFromGPX,
	calculateFromTCX : calculateFromTCX
};
