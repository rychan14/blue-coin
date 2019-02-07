# A node.js box
FROM node:latest

MAINTAINER rychan14@gmail.com

RUN mkdir -p /app

WORKDIR /app

COPY package-lock.json package.json ./

# RUN npm install -g webpack
# RUN npm install -g webpack-cli
# RUN npm install -g nodemon

RUN npm install --no-progress --ignore-optional

EXPOSE 5000
EXPOSE 5001

# VOLUME ['~/Documents/nodejsplayground/blue-coin/client']

CMD npm start