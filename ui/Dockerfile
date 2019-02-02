# A node.js v8 box
FROM node:11

MAINTAINER rychan14@gmail.com

RUN mkdir -p /app

WORKDIR /app

COPY . .

# RUN npm install -g webpack
# RUN npm install -g webpack-cli
RUN npm install -g nodemon

RUN npm install

EXPOSE 5000

CMD npm start