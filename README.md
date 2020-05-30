# lighthouse-dashboard
<a href="https://codeclimate.com/repos/5e130cad7a81c501b700c473/maintainability"><img src="https://api.codeclimate.com/v1/badges/d151a3e60f81d7afcb6b/maintainability" /></a>
<a href="https://codeclimate.com/repos/5e130cad7a81c501b700c473/test_coverage"><img src="https://api.codeclimate.com/v1/badges/d151a3e60f81d7afcb6b/test_coverage" /></a>

A dashboard to keep track on the performance of your sites. Keep track during development by setting up webhooks
in github to audit your site on every push to the `master` branch

## Frameworks
Datatbase: [mongodb](https://www.mongodb.com/)

RabbitMq: [amqplib](https://www.npmjs.com/package/amqplib)

Backend: [hapi](https://hapi.dev/)

Frontend: [Vue](https://vuejs.org/) & [Vuetify](https://vuetifyjs.com/en/)

## Routes
- [App](http://0.0.0.0:4000)
- [Swagger](http://0.0.0.0:4000/documentation) (only for NODE_ENV=development)

## Screenshots
![Dashboard](doc/assets/dashboard.png)
![Projects Overview](doc/assets/projects.png)
![Project Detail View](doc/assets/detail.png)

## Architecture

![Architecture](doc/assets/lhd_arch.png)

The app is split into two main parts. The UI and the worker.
The UI is responsible to provide the dashboard view via HTTP. The worker runs the audits of the projects in the background.
The worker consumes messages stores in the message queue and runs lighthouse to create new audits. The results will be 
stored in the mongodb. The UI will consume those messages via an API.

## Config
[Examples](doc/CONFIG.md)

## Run

### Run the UI
The UI is simple to run. Simply provide all environment variables described below and run `npm run build` to build the frontend
 and then `npm run start` to boot the server
 
### Run the worker
The worker consumes the messages in the queue and creates new audit results. 
Run the worker via `npm run worker`. I recommend to do this via a cronjob every 10 minutes.
So you can create new reports via the frontend and don't have to wait too long to be created.

### Run new audits
This command creates a new audit for every site configured. I recommend to do this every 6 to 12 hours.
Run the command via `npm run audit`


## Heroku
This app also works perfectly fine with heroku and a mlab MongoDB resource.

In addition to the nodejs buildpack you need the following ones:
- https://github.com/heroku/heroku-buildpack-google-chrome
- https://github.com/heroku/heroku-buildpack-chromedriver


## Development
First create a `.env` file in the project root.
It's content should be like shown below.

In addition to that, you need a mongodb. You could start the dev environment with `docker-compose up`
which will start the mongodb and a rabbitmq. After that, you could start your local server with 
`npm run dev`. 
After setting the correct connection string, your local server should connect to the mongo container.
Now you have a local server running which will be restarted (with nodemon) after every change.
If you want to work on the UI you can start the UI with  `npm run serve`.

## Docker
There is a functional `Dockerfile` in the project which you can use to host somewhere.
And with the `docker-compose up` command, you can spin up the whole dev environment with 
DB and message queue

### Add custom menu entry
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

## Env Variables

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
