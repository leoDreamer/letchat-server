FROM node:8.0.0

RUN echo "Asia/Shanghai" > /etc/timezone

RUN mkdir /app
WORKDIR /app

RUN npm install -g cnpm

COPY package.json /app
RUN cnpm install
