# lighthouse-dashboard
[![CircleCI](https://circleci.com/gh/dreipol/lighthouse-dashboard.svg?style=svg&circle-token=fa73435956cf491fcc4005ad5143e00ebf6871fa)](https://circleci.com/gh/dreipol/lighthouse-dashboard)
<a href="https://codeclimate.com/repos/5e130cad7a81c501b700c473/maintainability"><img src="https://api.codeclimate.com/v1/badges/d151a3e60f81d7afcb6b/maintainability" /></a>
<a href="https://codeclimate.com/repos/5e130cad7a81c501b700c473/test_coverage"><img src="https://api.codeclimate.com/v1/badges/d151a3e60f81d7afcb6b/test_coverage" /></a>

A dashboard to keep track on the performance of your sites. Keep track during development by setting up webhooks
in github to audit your site on every push to the `master` branch

# Features
- Responsive UI & Charts
- Password protected
- Highly customizable colors
- Easy to setup and host
- Runs [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) under the hood
- Open Source
- Supports Webhooks to trigger audits
- Uses [mongodb](https://www.mongodb.com/)
- Star a project to see it on the dashboard
- Choose between Desktop and Mobile audit settings
- Configure what you want to see and keep track of
- Runs in a [docker](https://www.docker.com/)
- UI built with [Vue](https://vuejs.org/)
- Server built with [hapi](https://hapi.dev/)
- Customizable server config
- [Real Time Status Monitor](https://www.npmjs.com/package/hapijs-status-monitor)
- [Swagger](http://0.0.0.0:4000/documentation) documentation for the APIs

# Screenshots
![Dashboard Darkmode](./doc/dark_dashboard.jpg)
![Project List Lightmode](./doc/light_projects.jpg)

# Hosting

## Docker
The only thing that you need is a hosting which supports dockerfiles. And (the same or another) one for the
mongodb. If you have that, clone the report, and follow the setup of that hoster.

## Heroku
This app also works perfectly fine with heroku and a mlab MongoDB resource

# Framework
Datatbase: [mongodb](https://www.mongodb.com/)

Backend: [hapi](https://hapi.dev/)

Frontend: [Vue](https://vuejs.org/) & [Vuetiy](https://vuetifyjs.com/en/)

# Routes
- [App](http://0.0.0.0:4000)
- [Swagger](http://0.0.0.0:4000/documentation)
- [Real Time Status ](http://0.0.0.0:4000/status)

# Config
Most config should be in `/dashboard.config.js`or `./server.config.js` whether it is backend or UI

# Startup
To get a minimal version up and running locally just clone this repo. Add a `.env` file with the variables described below
and run `docker-compose up`. After a couple of minutes you should be able to see that the server has started


# Development
To start debugging or enhancing the app you don't have to use docker.
First create a `.env` file in the project root.
It's content should be like shown below.

In addition to that, you need a mongodb. You could start the dev environment with `docker-compose up`
which will start the mongodb and the server on port 5000. After that, you could start your local server with 
`npm run server-dev`. After setting the correct connection string, your local server should connect to the mongo container.
Now you have a local server running which will be restarted (with nodemon) after every change.
If you want to work on the UI you can start the UI with  `npm run serve`. This will create a new app, which proxies your
already running local server and always delivers the newest UI.

# Env Variables

name | type | description | example
---|---|---|---
LOGIN_PASS | `string` | used for login | foobar
JWT_SECRET | `string` | secret used for the jwt token | asdf123 
MONGODB_URI | `string` | URI for the DB connection | mongodb://admin:admin@database:27017/auditreports
SENTRY_DSN | `string` | sentry DSN string | https://776d9de9782447ae87ffbcc03d24f6ad@sentry.io/1890421
PORT | `number` | port number| 5000
SHOW_ERROR_PAGES | `boolean` | show debug errorpages | true
WINSTON_LOG_LEVEL | `info,debug,error` | Log level for the winston logger | info
CONSOLE_RE_CHANNEL | `string` | channel for the console.re channel | my-lighthouse
