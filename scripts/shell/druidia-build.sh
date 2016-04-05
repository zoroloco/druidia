#!/bin/sh
# Grabs latest code from github, builds and executes.
# move this file to: /usr/local/src and chmod +x druidia-build.sh
#

clear

SRC_DIR="/usr/local/src/druidia"

echo "Stopping web server..."
sudo /etc/init.d/druidia-daemon.sh stop

echo "Gitting latest code..."

sudo rm -rf $SRC_DIR
sudo git clone https://github.com/zoroloco/druidia.git $SRC_DIR

echo "Now installing dependencies..."
cd $SRC_DIR
sudo npm install

echo "Now updating/syncing dependencies with bower..."
bower install

echo "making scripts executable..."
chmod +x $SRC_DIR/scripts/shell/druidia-run.sh

echo "moving and updating startup daemon script..."
sudo cp $SRC_DIR/scripts/shell/druidia-daemon.sh /etc/init.d/
sudo chmod +x /etc/init.d/druidia-daemon.sh
sudo update-rc.d druidia-daemon.sh defaults

echo "Now running server..."
$SRC_DIR/scripts/shell/druidia-run.sh
