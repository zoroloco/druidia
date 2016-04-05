#!/bin/sh
# Grabs latest code from github, builds and executes.
# move this file to: /usr/local/src and chmod +x druidia-build.sh
#

clear

SRC_DIR="/usr/local/src/druidia"

echo "Stopping web server..."
sudo systemctl stop druidia.service

echo "Gitting latest code..."

sudo rm -rf $SRC_DIR
sudo git clone https://github.com/zoroloco/druidia.git $SRC_DIR

echo "Now installing dependencies..."
cd $SRC_DIR
sudo npm install

echo "Now updating/syncing dependencies with bower..."
sudo chown kcenturion $SRC_DIR/public/libs
bower install --allow-root

echo "making scripts executable..."
sudo chmod +x $SRC_DIR/scripts/shell/druidia-run.sh

echo "moving and updating startup daemon script..."
sudo cp $SRC_DIR/scripts/shell/druidia /etc/init.d/
sudo chmod +x /etc/init.d/druidia

echo "Now running server..."
sudo chmod +x $SRC_DIR/scripts/shell/druidia-run.sh
sudo $SRC_DIR/scripts/shell/druidia-run.sh
