#dependencies

Install MongoDB for Centos 7.

https://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat/

sudo npm install -g bower
npm install -g typescript
sudo npm install -g ionic
npm install -g cordova
npm install -g ios-sim

npm install --save-dev typescript gulp gulp-typescript

npm install --save-dev browserify tsify vinyl-source-stream

npm install --save-dev watchify gulp-util

npm install --save-dev gulp-uglify vinyl-buffer gulp-sourcemaps

npm install --save-dev run-sequence

npm install -g uglify
npm install -g minify
npm install -g uglifyjs
npm install -g browserify

ionic platform add ios

#note
The init script is meant to work on Centos 7.

#Website application.

1.) Move scripts/shell/druidia-build.sh to /usr/local/src
2.) chmod +x druidia-build.sh
3.) ./druidia-build.sh

This build script will get latest code from github, delete previous version and install
all NPM and Bower dependencies and restart server.


NPM scripts:

npm start (starts express js server)
npm run build (compiles ts and puts compiled files in the app-web/dist folder)
npm run bundle (bundles all the js files in the dist folder to one file named bundle.js. Also performs browserify.)
npm run minify (uglifies the bundle.js file and creates a bundle.js.min file)
npm run copy_www (copies over the static html files from app-web/www to dist/www)

npm run brun (does everything)
