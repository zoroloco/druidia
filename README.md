#dependencies

Install MongoDB for Centos 7.

https://docs.mongodb.org/manual/tutorial/install-mongodb-on-red-hat/

sudo npm install -g bower
sudo npm install -g ionic

npm install --save-dev typescript gulp gulp-typescript
npm install --save-dev browserify tsify vinyl-source-stream
npm install --save-dev watchify gulp-util
npm install --save-dev gulp-uglify vinyl-buffer gulp-sourcemaps

npm install --save-dev run-sequence

#note
The init script is meant to work on Centos 7.

#Website application.

1.) Move scripts/shell/druidia-build.sh to /usr/local/src
2.) chmod +x druidia-build.sh
3.) ./druidia-build.sh

This build script will get latest code from github, delete previous version and install
all NPM and Bower dependencies and restart server.
