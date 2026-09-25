FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY server.js ./
COPY test.js ./

ENV PORT=3000
ENV APP_VERSION="Version 1"

EXPOSE 3000

CMD ["npm", "start"]
