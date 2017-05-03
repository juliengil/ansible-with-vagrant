FROM node:7
MAINTAINER julien.gil@fifty-five.com

RUN apt-get update 
RUN mkdir /home/test

COPY www/* /home/www/

VOLUME /home/www
EXPOSE 8080

RUN npm install mongodb

CMD node /home/www/serveur.js
