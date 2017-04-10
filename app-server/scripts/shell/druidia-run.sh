#!/bin/sh
#
# druidia-run.sh
#
# chmod +x druidia-run.sh
#

echo "Starting druidia.net server..."
cd /usr/local/src/druidia

#start  mongod on windows
# mongod --port 27017 --dbpath "C:\Program Files\MongoDB\data\db"


sudo npm start
