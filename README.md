# lighthouse-dashboard
<a href="https://codeclimate.com/repos/5e130cad7a81c501b700c473/maintainability"><img src="https://api.codeclimate.com/v1/badges/d151a3e60f81d7afcb6b/maintainability" /></a>
<a href="https://codeclimate.com/repos/5e130cad7a81c501b700c473/test_coverage"><img src="https://api.codeclimate.com/v1/badges/d151a3e60f81d7afcb6b/test_coverage" /></a>

A dashboard to keep track on the performance of your sites. Keep track during development by setting up webhooks
in github to audit your site on every push to the `master` branch.

The application is split into several parts. The web application, a worker, a mongodb and a rabbitmq server.
In general, the webapp creates a new message which is posted to the mq server. The worker consumes the message and
starts a new lighthouse audit. That audit is then persisted in the mongodb.

## Webapp
This is the UI of the application. It communicates with the mongodb to fetch data and with the rabbitmq server
to dispatch new audits which will be processed by the worker.
 
## Worker
The worker connects to the rabbitmq server and consumes messages for new audits. The worker then persists the report 
back in the mongodb where it's read from the webapp and accessible via it's apis.
In order to start the worker you need to set a envvar named `IS_WORKER` in order to start the app as a worker.
This architecture simplifies hosting/deployment, since you can deploy the same application but with this additional env var.

# [Config](doc/CONFIG.md)

# Screenshots
![Dashboard Darkmode](doc/assets/dashboard.jpg)
![Search](doc/assets/search.jpg)
![Project Detail View](doc/assets/detail.jpg)
![Projects Table](doc/assets/table.jpg)

# Hosting

## Docker
The only thing that you need is a hosting which supports dockerfiles. And (the same or another) one for the
mongodb. If you have that, clone the report, and follow the setup of that hoster.

## Heroku
This app also works perfectly fine with heroku and a mlab MongoDB resource.

In addition to the nodejs buildpack you need the following ones:
- https://github.com/heroku/heroku-buildpack-google-chrome
- https://github.com/heroku/heroku-buildpack-chromedriver

# Frameworks
Datatbase: [mongodb](https://www.mongodb.com/)
RabbitMq: [amqplib](https://www.npmjs.com/package/amqplib)

Backend: [hapi](https://hapi.dev/)

Frontend: [Vue](https://vuejs.org/) & [Vuetiy](https://vuetifyjs.com/en/)

# Routes
- [App](http://0.0.0.0:4000)
- [Swagger](http://0.0.0.0:4000/documentation) (only for NODE_ENV=development)

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

## Add custom menu entry
There is a possibility to add additional entries to the projects menu. This is useful
if you want to provide some quick access to 3rd party tools like [cssstats](https://cssstats.com/)

![Custom menu entry](./doc/assets/custom_menu.png).

To add those entries simply edit the `config/dashboard.js` and add an entry to `PROJECT_MENU_CUSTOM_ENTRIES`.
The entry has to look like this 

    {
        name: 'CSS Stats',
        link: function(url) {
            return `https://cssstats.com/stats?url=${ url }`;
        },
    },
    
where name is the name printed in the UI and link is a function which will be called
with the projects url to generate the link for the new page

# Env Variables

name | type | description | example
---|---|---|---
LOGIN_PASS | `string` | used for login | foobar
JWT_SECRET | `string` | secret used for the jwt token | asdf123 
MONGODB_URI | `string` | URI for the DB connection | mongodb://admin:admin@database:27017/auditreports
SENTRY_DSN | `string` | sentry DSN string | https://776d9de9782447ae87ffbcc03d24f6ad@sentry.io/1890421
PORT | `number` | port number| 5000
WINSTON_LOG_LEVEL | `info/debug/error` | Log level for the winston logger | info
MESSAGE_QUEUE_URI | `string` | uri to the RabbitMq instance | `amqp://user:password@localhost`
IS_WORKER | `boolean` | Define if the worker should be started or the server | true
LHD_IGNORE_RAW | `boolean` | If this is defined, raw data from the audit wont be saved. You can't inspect the HTML of that report | false
G_ANALYTICS_ID | `string` | Google Analytics ID for tracking | `GA-XXXXX-X`
