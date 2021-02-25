FROM node:14.15.4-alpine3.12

RUN apk add --no-cache bash git

RUN npm install commitizen -g

USER node

RUN git config --global user.name "Mateus José Barbosa"
RUN git config --global user.email "dev.mateusbarbosa@gmail.com"

WORKDIR /home/node/app