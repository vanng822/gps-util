var xml2js = require('xml2js'), parser = new xml2js.Parser();
var fs = require('fs');
var http = require('http');
var https = require('https');

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
			if(trkpt.hasOwnProperty(ATTRIBUTE_NAME) && trkpt[ATTRIBUTE_NAME].hasOwnProperty('lat')) {
				trk = new Trackpoint();
				trk.lat = parseFloat(trkpt[ATTRIBUTE_NAME].lat);
				trk.lng = parseFloat(trkpt[ATTRIBUTE_NAME].lon);
				if (trkpt.hasOwnProperty('time')) {
					trk.time = new Date(trkpt.time);
				}

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
		if(result.gpx && result.gpx.trk) {
			return callback(null, getTrk(result.gpx.trk));
		} else {
			return callback(new Error('Unexpected data'), null);
		}
	});
};
var gpxParseFile = function(filename, callback) {
    fs.readFile(filename, function(err, result) {
		if(err) {
			return callback(err, null);
		}
		return gpxParse(result, callback);
	});
};
var gpxParseURL = function(url, callback, secure) {
	var h = secure? https : http;
	h.get(url, function(res) {
		var data = '';
		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on('end', function() {
			if(res.statusCode == 200) {
				return gpxParse(new Buffer(data), callback);
			} else {
				return callback(new Error('Got unexpected response code'), null);
			}
		});
	}).on('error', function(err) {
		return callback(err, null);
	});
};

module.exports = {
	gpxParse : gpxParse,
	gpxParseFile : gpxParseFile,
	gpxParseURL : gpxParseURL
};
