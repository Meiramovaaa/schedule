FROM node:16.17.0-alpine AS builder
WORKDIR /frontend
COPY ./package.json .
RUN npm i 

ENV NODE_ENV production
EXPOSE 4002
COPY . .
CMD ["npm" ,  "start"]