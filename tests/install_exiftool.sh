
wget http://www.sno.phy.queensu.ca/~phil/exiftool/Image-ExifTool-9.29.tar.gz
tar -xzf Image-ExifTool-9.29.tar.gz
cd Image-ExifTool-9.29
perl Makefile.PL

sudo make install

exiftool -ver

res=$?

if [ "$res" != "0" ]; then
	echo "could not install exiftool"
	exit 1
fi
