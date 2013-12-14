var base32String = '0123456789bcdefghjkmnpqrstuvwxyz';

var encode = function(latitude, longitude, precision) {
	var precision = precision || 12;
	var geohash = [], bits = [16, 8, 4, 2, 1], bit = 0;
	var maxLat = 90, minLat = -90;
	var maxLng = 180, minLng = -180;
	var mid, hashPos = 0, even = true;
	while(geohash.length < precision) {
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
		if(bit < 4) {
			bit++;
		} else {
			geohash.push(base32String[hashPos]);
			bit = 0;
			hashPos = 0;
		}
	}
	return geohash.join('');
};
var binary2dec = function(binaryString, max, min) {
	var mid, i, len;
	for( i = 0, len = binaryString.length; i < len; i++) {
		mid = (max + min) / 2;
		if(binaryString[i] === '1') {
			min = mid;
		} else {
			max = mid;
		}
	}
	return [min, max];
};
var hash2binary = function(hash) {
	var i, len, even = true, bits, hashPos, lngBinary = '', latBinary = '';
	for( i = 0, len = hash.length; i < len; i++) {
		hashPos = base32String.indexOf(hash[i]);
		if(hashPos == -1) {
			throw new Error('Invalid hash character');
		}
		for( bits = 4; bits >= 0; bits--) {
			if(even) {
				lngBinary += (hashPos >> bits) & 1;
			} else {
				latBinary += (hashPos >> bits) & 1;
			}
			even = !even;
		}
	}
	return [latBinary, lngBinary];
};
var decode = function(hash) {
	var binary = hash2binary(hash);
	var latRange = binary2dec(binary[0], 90, -90);
	var lngRange = binary2dec(binary[1], 180, -180);
	var lat = (latRange[0] + latRange[1]) / 2;
	var lng = (lngRange[0] + lngRange[1]) / 2;
	return {
		latitude : lat,
		longitude : lng,
		error : {
			latitude : latRange[1] - lat,
			longitude : lngRange[1] - lng,
		}
	};
};

module.exports = {
	geohashDecode : decode,
	geohashEncode : encode
}