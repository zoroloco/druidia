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
sudo chmod +x $SRC_DIR/app/scripts/shell/druidia-run.sh
sudo chmod +x $SRC_DIR/app/scripts/shell/druidia-update.sh

echo "moving and updating startup daemon script..."
#sudo rm -rf /usr/lib/systemd/system/druidia.service
sudo chmod +x $SRC_DIR/app/scripts/shell/druidia.service
sudo cp $SRC_DIR/app/scripts/shell/druidia.service /usr/lib/systemd/system/
cd /etc/systemd/system
sudo ln -s /usr/lib/systemd/system/druidia.service ./druidia.service
sudo systemctl daemon-reload

echo "Now running server..."
sudo chmod +x $SRC_DIR/app/scripts/shell/druidia-run.sh
sudo systemctl start druidia.service
#sudo $SRC_DIR/scripts/shell/druidia-run.sh
