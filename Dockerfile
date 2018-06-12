FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . ./

RUN rm -rf ./dist
RUN npm run build

CMD [ "npm", "run", "server" ]
