FROM node:12-alpine

RUN mkdir -p /app/

WORKDIR /app/

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser
ENV GOOGLE_CHROME_BIN /usr/bin/chromium-browser

COPY package.json package-lock.json /app/

COPY ./ /app/

RUN npm i

ENV NODE_ENV=production

RUN npm run build

# Running
CMD [ "npm", "run", "start" ]
