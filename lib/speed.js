var constants = require('./constants');
var time = require('./time');

/**
 *
 *
 * @param distance Float meters
 * @param time1 Date
 * @param time2 Date
 *
 * @return float speed in meter per second
 */
var calculateSpeed = function(distance, time1, time2) {
	if( typeof distance == 'undefined' || distance < 0) {
		return undefined;
	}
	if(!time1 || !time2 || time2 <= time1) {
		return undefined;
	}
	return (1000 * distance) / (time2.getTime() - time1.getTime());
};
var convertTypes = {
	MPSec2KmPH : 'MPSec2KmPH',
	KmPH2MPSec : 'KmPH2MPSec',
	MPSec2MPH : 'MPSec2MPH',
	MPH2MPSec : 'MPH2MPSec'
};

/* Those may make the tests fail if they are run in diff precision :-D */
var convertFactors = {
	MPSec2KmPH : 3.6,
	KmPH2MPSec : 1 / 3.6,
	MPSec2MPH : 3600 / constants.MILE_IN_METERS,
	MPH2MPSec : constants.MILE_IN_METERS / 3600
};

var convertSpeed = function(speed, fromto) {
	var scaleFactor;

	if(convertFactors.hasOwnProperty(fromto)) {
		scaleFactor = convertFactors[fromto];
	} else {
		throw new Error('Not supported conversion: ' + fromto);
	}

	return speed * scaleFactor;
};
var calculatePaceTypes = {
	PER_KM : 'PER_KM',
	PER_MILE : 'PER_MILE'
};

var PaceResult = function(hours, minutes, seconds, type) {
	this.hours = hours;
	this.minutes = minutes;
	this.seconds = seconds;
	this.type = type;
};

PaceResult.prototype.padDigitsString = function(digits) {
	if(digits < 10) {
		return '0' + digits;
	}
	return String(digits);
};

PaceResult.prototype.toString = function() {
	var str = '';
	if(this.hours) {
		str += this.padDigitsString(this.hours) + ':';
	}
	str += this.padDigitsString(this.minutes) + ':';
	str += this.padDigitsString(this.seconds);
	switch(this.type) {
		case calculatePaceTypes.PER_KM:
			str += ' / km';
			break;
		case calculatePaceTypes.PER_MILE:
			str += ' / mile';
			break;
	}
	return str;
};

/**
 *
 * @param speed m/s
 * @param type /km or /mile
 */
var calculatePace = function(speed, type) {
	var result = new PaceResult(), secs, dd;
	result.type = type;

	if(speed > 0) {
		switch(type) {
			case calculatePaceTypes.PER_KM:
				secs = 1000 / speed;
				break;
			case calculatePaceTypes.PER_MILE:
				secs = constants.MILE_IN_METERS / speed;

				break;
			default:
				throw new Error('Not supported type: ' + type);
		}
		dd = new time.RelativeTime(secs);
		result.hours = dd.hours;
		result.minutes = dd.minutes;
		result.seconds = dd.seconds;
	}
	return result;
};

module.exports = {
	calculateSpeed : calculateSpeed,
	calculatePace : calculatePace,
	calculatePaceTypes : calculatePaceTypes,
	convertSpeed : convertSpeed,
	convertTypes : convertTypes
};
