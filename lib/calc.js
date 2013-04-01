
var time = require('./time');
var speed = require('./speed');
var distance = require('./distance');

var TrackingResult = function() {
	this.points = null;
	this.averageSpeed = undefined;
	this.fastestSpeed = undefined;
	this.slowestSpeed = undefined;
	/* Pace can be converted from speed */
	this.totalDistance = 0;
	this.totalTime = 0;
};
/**
 * Calculate speed and distance
 * points will get modified and parse back in the callback as result.points
 * First point assumed same speed as the second point
 * 
 * TODO: calculate based on more than 2 points for better values
 * 
 */
var calculateFromGPX = function(points, callback) {
	var i, len, currentDistance, currentSpeed, fastestSpeed = 0, slowestSpeed = 100000000;
	var result;
	if(points.length < 2) {
		return callback(new Error('Result can not be calculated properly with data points less than 2'), null);
	}
	try {
		result = new TrackingResult();
		points[0].distance = 0;
		for( i = 0, len = points.length - 1; i < len; i++) {
			currentDistance = distance.getDistance(points[i].lng, points[i].lat, points[i + 1].lng, points[i + 1].lat);
			currentSpeed = speed.calculateSpeed(currentDistance, points[i].time, points[i + 1].time);
			result.totalDistance += currentDistance;
			points[i + 1].distance = points[i].distance + currentDistance;
			points[i + 1].speed = currentSpeed;
			if(currentSpeed > fastestSpeed) {
				fastestSpeed = currentSpeed;
			}
			if(currentSpeed < slowestSpeed) {
				slowestSpeed = currentSpeed;
			}
		}
		
		points[0].speed = points[1].speed;
		result.averageSpeed = speed.calculateSpeed(result.totalDistance, points[0].time, points[len].time);
		result.fastestSpeed = fastestSpeed;
		result.slowestSpeed = slowestSpeed;
		/*result.fastestPace = speed.calculatePace(fastestSpeed, speed.calculatePaceTypes.PER_KM);
		result.slowestPace = speed.calculatePace(slowestSpeed, speed.calculatePaceTypes.PER_KM);
		result.averagePace = speed.calculatePace(result.averageSpeed, speed.calculatePaceTypes.PER_KM);
		*/
		result.totalTime = time.getDiffInSecs(points[0].time, points[len].time);
		result.points = points;
		callback(null, result);
	} catch(e) {
		callback(e, null);
	}
};



module.exports = {
	calculateFromGPX : calculateFromGPX
};