FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . ./

ARG CIRCLE_TOKEN
ENV PORT 3000

EXPOSE ${PORT}

RUN npm run build
CMD [ "npm", "run", "proxy" ]
