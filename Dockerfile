FROM alpine:edge

# Installs latest Chromium (77) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      freetype-dev \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      npm

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser

# App Building
WORKDIR /usr/src/app

ENV NODE_ENV=development
COPY package*.json ./

RUN npm install
COPY . .

ENV NODE_ENV=production
RUN npm run build

# Running
CMD [ "npm", "run", "start" ]
