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
	dd.seconds = Math.round(10 * ((decDegrees * 3600) % 60)) / 10;
	return dd;
};

module.exports = {
	toDD : toDD,
	getDDLatitude : getDDLatitude,
	getDDLongitude : getDDLongitude
};
