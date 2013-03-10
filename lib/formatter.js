var getDMSLongitudeNotation = function(decDegrees) {
	if(decDegrees < 0)
		return "W";
	return "E";
};
var getDMSLatitudeNotation = function(decDegrees) {
	if(decDegrees < 0)
		return "S";
	return "N";
};
var getDMSLongitude = function(decDegrees) {
	var dd = toDMS(decDegrees);
	return dd.degrees + "° " + dd.minutes + "' " + dd.seconds + "\" " + getDMSLongitudeNotation(decDegrees);
};
var getDMSLatitude = function(decDegrees) {
	var dd = toDMS(decDegrees);
	return dd.degrees + "° " + dd.minutes + "' " + dd.seconds + "\" " + getDMSLatitudeNotation(decDegrees);
};
var toDMS = function(decDegrees) {
	var dd = {};
	decDegrees = Math.abs(decDegrees);
	dd.degrees = Math.floor(decDegrees);
	dd.minutes = Math.floor(decDegrees * 60) % 60;
	dd.seconds = Math.round(100 * ((decDegrees * 3600) % 60)) / 100;
	return dd;
};

var toDD = function(degrees, minutes, seconds) {
	var d = degrees;
	d += minutes/60;
	d += seconds/3600;
	return Math.round(10000 * d) / 10000;
};

module.exports = {
	toDD : toDD,
	getDMSLatitude : getDMSLatitude,
	getDMSLongitude : getDMSLongitude,
	toDMS : toDMS
};
