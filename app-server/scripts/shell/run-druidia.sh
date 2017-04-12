#!/bin/sh
#
# Note:Store this file outside of the working directory.

echo "Starting druidia.net server..."
cd /usr/local/src/druidia

#start  mongod on windows
# mongod --port 27017 --dbpath "C:\Program Files\MongoDB\data\db"

export PATH=$PATH:$HOME/.local/bin:$HOME/bin:/var/lib/mongodb/bin

mongod&

cd /home/kcenturion/Documents/dev/druidia/app-server
sudo npm start
