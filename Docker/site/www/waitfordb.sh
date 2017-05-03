#!/bin/sh
while ! curl db:27017;
	do
    	echo sleeping;
        sleep 1;
    done;
echo Connected!;
node /home/www/serveur.js