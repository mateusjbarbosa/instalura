FROM node:14.16.1

# Install Cypress dependecies
RUN apt-get update && \
    apt-get -y install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev \
    libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb

USER node

WORKDIR /home/node/app