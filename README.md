#dependencies

sudo npm install -g bower
sudo npm install phantomjs -g
sudo npm install -g karma-cli

#note
The init script is meant to work on Centos 7.

#Website application.

1.) Move scripts/shell/build.sh to /usr/local/src
2.) chmod +x build.sh
3.) ./build.sh

This build script will get latest code from github, delete previous version and install
all NPM and Bower dependencies and restart server.
