var assert = require('assert');

var gpx = require('../lib/gpx-parser.js');
var vows = require('vows');

/* For testing url based gpx data */
var http = require('http');
var fs = require('fs');
var PORT = 8080;
var HOST = '127.0.0.1';
http.createServer(function(req, res) {
	if(req.url == '/data.gpx') {
		fs.readFile('./tests/data/data.gpx', function(err, data) {
			if(err) {
				throw err;
			}
			res.writeHead(200, {
				'Content-Type' : 'application/xml'
			});
			res.end(data);
		});
	} else if(req.url == '/bad.gpx') {
		res.writeHead(404, {
			'Content-Type' : 'text/html'
		});
		res.end('Hey bad request!');
	} else if(req.url == '/soft404.gpx') {
		res.writeHead(200, {
			'Content-Type' : 'application/xml'
		});
		res.end('This is a soft 404 which has 200 as status code');
	} else if(req.url == '/broken.gpx') {
		res.writeHead(200, {
			'Content-Type' : 'application/xml'
		});
		res.end(['<gpx version="1.1">', '<metadata>', '<link href="connect.garmin.com">', '<text>Garmin Connect</text>', '</link>', '  <time>2013-03-02T15:40:32.000Z</time>', ' </metadata>', '<trk>', '<name>Untitled</name>', ' <trkseg>', '<trkpt lon="17.661922238767147" lat="59.19305333867669">', '<ele>69.4000015258789</ele>', '<time>2013-03-02T15:40:31.000Z</time>', '</trkpt>', '<trkpt lon="17.662122901529074" lat="59.192982176318765">', '<ele>69.5999984741211</ele>', ' <time>2013-03-02T15:40:38.000Z</time>', '</trkpt>', '</gpx>'].join());
	} else if (req.url == '/image.gpx') {
		fs.readFile('./tests/data/loading.gif', function(err, data) {
			if(err) {
				throw err;
			}
			res.writeHead(200, {
				'Content-Type' : 'application/xml'
			});
			res.end(data);
		});
	}
}).listen(PORT, HOST);

vows.describe('Test suite for parsing gpx').addBatch({
	'Parse broken gpx data' : {
		topic : function() {
			gpx.gpxParse(['<gpx version="1.1">', '<metadata>', '<link href="connect.garmin.com">', '<text>Garmin Connect</text>', '</link>', '  <time>2013-03-02T15:40:32.000Z</time>', ' </metadata>', '<trk>', '<name>Untitled</name>', ' <trkseg>', '<trkpt lon="17.661922238767147" lat="59.19305333867669">', '<ele>69.4000015258789</ele>', '<time>2013-03-02T15:40:31.000Z</time>', '</trkpt>', '<trkpt lon="17.662122901529074" lat="59.192982176318765">', '<ele>69.5999984741211</ele>', ' <time>2013-03-02T15:40:38.000Z</time>', '</trkpt>', '</gpx>'].join(), this.callback);
		},
		'should return an error' : function(err, result) {
			assert.equal(err != null, true);
			assert.equal(result == null, true);
		}
	},
	'Parse valid xml but wrong format' : {
		topic : function() {
			gpx.gpxParse('<?xml version="1.0" encoding="UTF-8"?><TrainingCenterDatabase></TrainingCenterDatabase>', this.callback);
		},
		'should return an error' : function(err, result) {
			assert.equal(err != null, true);
			assert.equal(result == null, true);
		}
	},
	'Parse gpx data should return an array of two tracking points' : function() {
		gpx.gpxParse(['<gpx version="1.1">', '<metadata>', '<link href="connect.garmin.com">', '<text>Garmin Connect</text>', '</link>', '  <time>2013-03-02T15:40:32.000Z</time>', ' </metadata>', '<trk>', '<name>Untitled</name>', ' <trkseg>', '<trkpt lon="17.661922238767147" lat="59.19305333867669">', '<ele>69.4000015258789</ele>', '<time>2013-03-02T15:40:31.000Z</time>', '</trkpt>', '<trkpt lon="17.662122901529074" lat="59.192982176318765">', '<ele>69.5999984741211</ele>', ' <time>2013-03-02T15:40:38.000Z</time>', '</trkpt>', '</trkseg>', '</trk>', '</gpx>'].join(), function(err, result) {
			assert.deepEqual(result, [{
				distance : undefined,
				speed : undefined,
				lat : 59.19305333867669,
				lng : 17.661922238767147,
				ele : 69.4000015258789,
				time : new Date('2013-03-02T15:40:31.000Z')
			}, {
				distance : undefined,
				speed : undefined,
				lat : 59.192982176318765,
				lng : 17.662122901529074,
				ele : 69.5999984741211,
				time : new Date('2013-03-02T15:40:38.000Z')
			}]);
		});
	},
	'Parse gpx file data.gpx' : {
		'topic' : function() {
			gpx.gpxParseFile('./tests/data/data.gpx', this.callback);
		},
		'Should return an array of two tracking points' : function(err, result) {
			assert.deepEqual(result, [{
				distance : undefined,
				speed : undefined,
				lat : 59.19305333867669,
				lng : 17.661922238767147,
				ele : 69.4000015258789,
				time : new Date('2013-03-02T15:40:31.000Z')
			}, {
				distance : undefined,
				speed : undefined,
				lat : 59.192982176318765,
				lng : 17.662122901529074,
				ele : 69.5999984741211,
				time : new Date('2013-03-02T15:40:38.000Z')
			}]);
		}
	},
	'Parse a image file' : {
		topic : function() {
			 gpx.gpxParseFile('./tests/data/loading.gif', this.callback);
		},
		'Should return an error ': function(err, result) {
			assert.equal(err != null, true);
			assert.equal(err.message, 'Got unexpected data type');
		}
	},
	'Parse gpx URL' : {
		'topic' : function() {
			gpx.gpxParseURL('http://' + HOST + ':' + PORT + '/data.gpx', this.callback);
		},
		'Should return an array of two tracking points' : function(err, result) {
			assert.deepEqual(result, [{
				distance : undefined,
				speed : undefined,
				lat : 59.19305333867669,
				lng : 17.661922238767147,
				ele : 69.4000015258789,
				time : new Date('2013-03-02T15:40:31.000Z')
			}, {
				distance : undefined,
				speed : undefined,
				lat : 59.192982176318765,
				lng : 17.662122901529074,
				ele : 69.5999984741211,
				time : new Date('2013-03-02T15:40:38.000Z')
			}]);
		}
	},
	'Parse bad gpx URL' : {
		'topic' : function() {
			gpx.gpxParseURL('http://' + HOST + ':' + PORT + '/bad.gpx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
		}
	},
	'Parse bad gpx URL which returns a soft 404' : {
		'topic' : function() {
			gpx.gpxParseURL('http://' + HOST + ':' + PORT + '/soft404.gpx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
		}
	},
	'Parse gpx URL which returns a broken xml' : {
		'topic' : function() {
			gpx.gpxParseURL('http://' + HOST + ':' + PORT + '/broken.gpx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
		}
	},
	'Parse image URL' : {
		'topic' : function() {
			gpx.gpxParseURL('http://' + HOST + ':' + PORT + '/image.gpx', this.callback);
		},
		'Should return an error' : function(err, result) {
			assert.equal(err != null, true);
			assert.equal(err.message, 'Got unexpected data type');
		}
	}
}).export(module)