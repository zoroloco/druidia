#!/bin/sh
#
# pulls only latest code from github.

echo "gitting latest code..."
sudo git pull -v https://github.com/zoroloco/druidia.git
echo "restarting server..."
sudo systemctl restart druidia.service
