FROM node:carbon

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

ENV CIRCLE_TOKEN ''
ENV PORT 3000

EXPOSE ${PORT}

CMD [ "npm", "run", "build" ]
CMD [ "npm", "run", "proxy" ]
