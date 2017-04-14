#Environment Setup

Install MongoDB for Centos 7.

https://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat/

sudo npm install -g bower
npm install -g typescript
sudo npm install -g ionic
npm install -g cordova
npm install -g ios-sim
npm install passport-facebook
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

#Install libraries
bower install (installs front-end static files)
npm install (installs all front and back-end dependencies)

#NPM scripts:

npm start (starts express js server)
npm run build (compiles ts and puts compiled files in the app-web/dist folder)
npm run bundle (bundles all the js files in the dist folder to one file named bundle.js. Also performs browserify.)
npm run minify (uglifies the bundle.js file and creates a bundle.js.min file)
npm run copy_www (copies over the static html files from app-web/www to dist/www)

npm run brun (does everything)

#run as a service
chmod 755 /YOURPATH/run-druidia.sh
sudo nano /etc/systemd/druidia.service

Put the following in the file:

[Unit]
Description=druidia.net
After=network.target

[Service]
Type=simple
ExecStart=YOURPATH/run-druidia.sh -s

Restart=on-abort

[Install]
WantedBy=multi-user.target

Then run:  sudo systemctl daemon-reload

Now you can:
sudo systemctl start|stop|status druidia.service
