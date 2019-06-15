#!/bin/sh
#
# Note:Store this file outside of the working directory.

# echo "Starting druidia.net server..."
# cd /usr/local/src/druidia

#start  mongod on windows
# mongod --port 27017 --dbpath "C:\Program Files\MongoDB\data\db"

# export PATH=$PATH:$HOME/.local/bin:$HOME/bin:/var/lib/mongodb/bin

# mongod&

# -E to preserve user's run environment so it can use the process.env variables.
# Note: Sudoers file altered so my user does not require a password.
# cd app-server
sudo -E npm start
