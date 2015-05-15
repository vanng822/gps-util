
VERSION=9.95

wget http://www.sno.phy.queensu.ca/~phil/exiftool/Image-ExifTool-${VERSION}.tar.gz
tar -xzf Image-ExifTool-${VERSION}.tar.gz
cd Image-ExifTool-${VERSION}
## make & install
perl Makefile.PL
sudo make install

## clean up
cd ..
sudo rm Image-ExifTool-${VERSION}.tar.gz
sudo rm -r Image-ExifTool-${VERSION}

## test if it works
exiftool -ver

res=$?

if [ "$res" != "0" ]; then
	echo "could not install exiftool"
	exit 1
fi
