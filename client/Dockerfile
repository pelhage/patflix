FROM node:12.16.1-alpine

WORKDIR /app

COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

CMD ["node", "./server.js"]