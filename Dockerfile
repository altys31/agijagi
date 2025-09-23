FROM node:18-alpine AS build

WORKDIR /app/fe

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn run build
RUN pwd
RUN ls -al
RUN ls -al /app/fe
RUN ls -al /app/fe/build