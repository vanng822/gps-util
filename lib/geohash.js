/**
 * http://en.wikipedia.org/wiki/Geohash
 */
var base32String = '0123456789bcdefghjkmnpqrstuvwxyz';

var encode = function(latitude, longitude, precision) {
	var precision = precision || 12;
	var geohash = [], bits = [16, 8, 4, 2, 1], bit = 0;
	var maxLat = 90, minLat = -90;
	var maxLng = 180, minLng = -180;
	var mid, hashPos, even = true, bitsLen = bits.length;
	while(geohash.length < precision) {
		for( hashPos = 0, bit = 0; bit < bitsLen; bit++) {
			if(even) {
				mid = (maxLng + minLng) / 2;
				if(longitude > mid) {
					hashPos |= bits[bit];
					minLng = mid;
				} else {
					maxLng = mid;
				}
			} else {
				mid = (maxLat + minLat) / 2;
				if(latitude > mid) {
					hashPos |= bits[bit];
					minLat = mid;
				} else {
					maxLat = mid;
				}
			}
			even = !even;
		}
		geohash.push(base32String[hashPos]);
	}
	return geohash.join('');
};

var decode = function(hash) {
	var maxLat = 90, minLat = -90;
	var maxLng = 180, minLng = -180;
	var i, len, even = true, bit, hashPos, mid;
	var lat, lng;
	for( i = 0, len = hash.length; i < len; i++) {
		hashPos = base32String.indexOf(hash[i]);
		if(hashPos == -1) {
			throw new Error('Invalid hash character');
		}
		for( bit = 4; bit >= 0; bit--) {
			if(even) {
				mid = (maxLng + minLng) / 2;
				if(((hashPos >> bit) & 1) == 1) {
					minLng = mid;
				} else {
					maxLng = mid;
				}
			} else {
				mid = (maxLat + minLat) / 2;
				if(((hashPos >> bit) & 1) == 1) {
					minLat = mid;
				} else {
					maxLat = mid;
				}
			}
			even = !even;
		}
	}
	lat = (minLat + maxLat) / 2;
	lng = (minLng + maxLng) / 2;
	return {
		latitude : lat,
		longitude : lng,
		error : {
			latitude : maxLat - lat,
			longitude : maxLng - lng,
		}
	};
};

module.exports = {
	geohashDecode : decode,
	geohashEncode : encode
}