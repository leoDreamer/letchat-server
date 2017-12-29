FROM node:8.0.0

RUN echo "Asia/Shanghai" > /etc/timezone

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN ln -s ./node_modules /app/node_modules

ENV NODE_ENV development
ENV PORT 80

ENTRYPOINT [ "npm run dev" ]