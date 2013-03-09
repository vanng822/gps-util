var getDDLongitudeNotation = function(decDegrees) {
	if(decDegrees < 0)
		return "W";
	return "E";
};
var getDDLatitudeNotation = function(decDegrees) {
	if(decDegrees < 0)
		return "S";
	return "N";
};
var getDDLongitude = function(decDegrees) {
	var dd = toDD(decDegrees);
	return dd.degrees + "° " + dd.minutes + "' " + dd.seconds + "\" " + getDDLongitudeNotation(decDegrees);
};
var getDDLatitude = function(decDegrees) {
	var dd = toDD(decDegrees);
	return dd.degrees + "° " + dd.minutes + "' " + dd.seconds + "\" " + getDDLatitudeNotation(decDegrees);
};
var toDD = function(decDegrees) {
	var dd = {};
	decDegrees = Math.abs(decDegrees);
	dd.degrees = Math.floor(decDegrees);
	dd.minutes = Math.floor(decDegrees * 60) % 60;
	dd.seconds = Math.round(100 * ((decDegrees * 3600) % 60)) / 100;
	return dd;
};

var toDecimal = function(degrees, minutes, seconds) {
	var d = degrees;
	d += minutes/60;
	d += seconds/3600;
	return Math.round(10000 * d) / 10000;
};

module.exports = {
	toDD : toDD,
	getDDLatitude : getDDLatitude,
	getDDLongitude : getDDLongitude,
	toDecimal : toDecimal
};
