FROM module:base

RUN echo "Asia/Shanghai" > /etc/timezone

COPY . /app
WORKDIR /app

ENV NODE_ENV test

RUN npm run build
ENV PORT 80

ENTRYPOINT npm run dev