gps-util
========

GPS related functionalities

[![build status](https://secure.travis-ci.org/vanng822/gps-util.png)](http://travis-ci.org/vanng822/gps-util)


## Functions

### getDistance(lng1, lat1, lng2, lat2)
* `lng1` longitude of point 1 in decimal degrees
* `lat1` latitude of point 1 in decimal degrees
* `lng2` longitude of point 2 in decimal degrees
* `lat2` latitude of point 2 in decimal degrees

### getTotalDistance(points)
* `points` array of coordinates, example

	[{lat: 59.19288511388004,
	lng: 17.66255029477179
	},{
	lat: 59.19290036894381,
	lng: 17.662896132096648
	}]

### toDMS(decDegrees)
Convert decimal degrees to degrees, minutes and seconds (return an object)

### getDMSLatitude(decDegrees)
Return a string representation in DMS format, ie 59° 19' 59.88" N

### getDMSLongitude(decDegrees)
Return a string representation in DMS format, 18° 3' 0" E

### toDD(degrees, minutes, seconds)
Convert to decimal degrees

### gpxParse(data, callback)
* `data` xml string
* `callback` function which take 2 arguments, error and result

### gpxParseFile(filename, callback)
* `filename` file to parse the data
* `callback` function which take 2 arguments, error and result
