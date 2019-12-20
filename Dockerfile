FROM node:10


#Setup
RUN apt-get update \
 && apt-get install -y chromium ttf-freefont \
 && rm -rf /var/lib/apt/lists/*

# App Building
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 9222

# Running
CMD [ "npm", "run", "start" ]
