FROM node:16.17.0-alpine

WORKDIR /backend

COPY ./package.json .
RUN npm install
RUN npm install db-migrate-pg 
COPY . .
RUN apk update && apk add git && apk add bash
# EXPOSE 3003

# CMD npm start
# CMD [ "node", "server.js" ]

RUN git clone https://github.com/vishnubob/wait-for-it.git