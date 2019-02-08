# A node.js box
FROM node:latest

MAINTAINER rychan14@gmail.com

RUN mkdir -p /app

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 5000
EXPOSE 5001


CMD npm start