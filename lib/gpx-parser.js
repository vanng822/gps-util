var xml2js = require('xml2js'), parser = new xml2js.Parser();
var fs = require('fs');
var speed = require('./speed');

var ATTRIBUTE_NAME = '$';

var Trackpoint = function() {
	this.lat = null;
	this.lng = null;
	this.ele = null;
	this.time = null;
	this.speed = undefined;
	this.distance = undefined;
};

var getTrk = function(trks) {
	var returnTrks = [], trkpts, trkpt, trk;
	var i, len, j, jlen;
	if(!( trks instanceof Array)) {
		trks = [trks];
	}
	for( i = 0, len = trks.length; i < len; i++) {
		trkpts = trks[i].trkseg[0].trkpt;
		for( j = 0, jlen = trkpts.length; j < jlen; j++) {
			trkpt = trkpts[j];
			if(trkpt.hasOwnProperty(ATTRIBUTE_NAME) 
				&& trkpt[ATTRIBUTE_NAME].hasOwnProperty('lat')
				&& trkpt.hasOwnProperty('time')) {
				trk = new Trackpoint();
				trk.lat = parseFloat(trkpt[ATTRIBUTE_NAME].lat);
				trk.lng = parseFloat(trkpt[ATTRIBUTE_NAME].lon);
				trk.time =  new Date(trkpt.time);

				if(trkpt.hasOwnProperty('ele')) {
					trk.ele = parseFloat(trkpt.ele);
				}
				
				returnTrks.push(trk);
			}
		}
	}

	return returnTrks;
};
var gpxParse = function(data, callback) {
	parser.parseString(data, function(err, result) {
		if(err) {
			return callback(err, null);
		}
		
		callback(null, getTrk(result.gpx.trk));
	});
};
var gpxParseFile = function(filename, callback) {
	fs.readFile(filename, function(err, result) {
		if(err) {
			return callback(err, null);
		}
		gpxParse(result, callback);
	});
};

/**
 * Calculate speed and distance
 * 
 */
var calculate = function(points, callback) {
	
};

module.exports = {
	gpxParse : gpxParse,
	gpxParseFile : gpxParseFile
};
