var getDiffInSecs = function(d1, d2) {
	return Math.round((d2.getTime() - d1.getTime())/1000);
};

var RelativeTime = function(secs) {
	this.hours = Math.floor(secs / 3600);
	this.minutes = Math.floor((secs % 3600) / 60);
	this.seconds = Math.round(secs % 60);
};

RelativeTime.prototype.toString = function() {
	var str = '';
	if(this.hours) {
		str += this.padDigitsString(this.hours) + ':';
	}
	str += this.padDigitsString(this.minutes) + ':';
	str += this.padDigitsString(this.seconds);
	return str;
};

RelativeTime.prototype.padDigitsString = function(digits) {
	if(digits < 10) {
		return '0' + digits;
	}
	return String(digits);
};

module.exports = {
	getDiffInSecs: getDiffInSecs,
	RelativeTime: RelativeTime
};
