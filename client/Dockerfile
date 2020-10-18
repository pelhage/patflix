## BUILD PHASE
FROM node:12.16.1-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

## RUN PHASE
# https://hub.docker.com/_/nginx
# default command of ngninx container runs
# the server
FROM nginx
EXPOSE 80
COPY --from=builder /app/dist /usr/share/nginx/html
