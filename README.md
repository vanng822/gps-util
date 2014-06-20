gps-util
========

GPS related functionalities. For getting and deleting gps info on an image one need to install exiftool.

http://www.sno.phy.queensu.ca/~phil/exiftool/index.html

Make sure exiftool is executable. if you have to install it manually on linux you can try ./scripts/install_exiftool.sh

## Functions

### getDistance(lng1, lat1, lng2, lat2)

Calculate distance of 2 given points

* `lng1` longitude of point 1 in decimal degrees
* `lat1` latitude of point 1 in decimal degrees
* `lng2` longitude of point 2 in decimal degrees
* `lat2` latitude of point 2 in decimal degrees

### getTotalDistance(points)

Calculate total distance of a serial of points

* `points` array of point, example

	[{lat: 59.19288511388004,
	lng: 17.66255029477179
	},{
	lat: 59.19290036894381,
	lng: 17.662896132096648
	}]

### getBoundingBox(lat, lng, distance)
* `lat` latitude of the center, in decimal degrees.
* `lng` longitude of the center, in decimal degrees.
* `distance` radius that spans the bounding box, in meters.

return an array containing 2 points that represent the bounding box.

### getMidPoint(points)
* `points` list of coordinate, each point with properties lat and lng

return Object/point with lat and lng

### toDMS(decDegrees)
Convert decimal degrees to degrees, minutes and seconds (return an object)

### getDMSLatitude(decDegrees)
Return a string representation in DMS format, ie 59° 19' 59.88" N

### getDMSLongitude(decDegrees)
Return a string representation in DMS format, ie 18° 3' 0" E

### toDD(degrees, minutes, seconds)
Convert to decimal degrees

### gpxParse(data, callback)
* `data` xml string of gpx format
* `callback` function which take 2 arguments, error and result

### gpxParseFile(filename, callback)
* `filename` file to parse the data in of gpx format
* `callback` function which take 2 arguments, error and result

### gpxParseURL(url, callback)
* `url` where the gpx data is located
* `callback` function(error, result)

### toGPX(trackingResult, callback, name)
* `trackingResult`
* `callback` function(error, result)
* `name` the name you want to call for this gpx document

### toKml(points, callback)
* `points` Track points for instance returned value from gpxParse or tcxParse
* `callback` function(error, result)

### tcxParse(data, callback)
* `data` xml string of tcx format
* `callback` function which take 2 arguments, error and result

### tcxParseFile(filename, callback)
* `filename` file to parse the data in of tcx format
* `callback` function which take 2 arguments, error and result

### tcxParseURL(url, callback)
* `url` where the tcx data is located
* `callback` function(error, result)

### calculateFromGPX(points, callback, fromIndex, toIndex)
* `points` Track points for instance returned value from gpxParse
* `callback` function(error, result) result is a TrackingResult (see calc.js for details)
* `fromIndex` Integer from 0
* `toIndex` Integer from 1

### imageGpsInfo(image, callback)
* `image` path to image to get GPS info
* `callback` function(error, result)

### removeGPSInfo(image, callback)
* `image` path to image to delete GPS info
* `callback` function(error, result) result is boolean

### geohashEncode(latitude, longitude, precision)
* `latitude` decimal latitude of the gps position
* `longitude` decimal longitude of the gps position 
* `precision` number of chars to represent the gps position, default 12

### geohashDecode(hash)
* `hash` hashed string representing the gps position
* return object of latitude, longitude, error

