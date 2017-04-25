#! /usr/bin/env node
const gsputil = require('../index');
if (process.argv.length !== 3) {
	console.log('image file required!');
	process.exit();
}
gsputil.imageGpsInfo(process.argv[2], function(err, result) {
	console.log(result);
});
