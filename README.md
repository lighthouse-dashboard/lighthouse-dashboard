# lighthouse-dashboard
[![Maintainability](https://api.codeclimate.com/v1/badges/ab19b9e057a07543d801/maintainability)](https://codeclimate.com/github/lighthouse-dashboard/lighthouse-dashboard/maintainability)
[![CodeFactor](https://www.codefactor.io/repository/github/lighthouse-dashboard/lighthouse-dashboard/badge)](https://www.codefactor.io/repository/github/lighthouse-dashboard/lighthouse-dashboard)


A dashboard to keep track on the performance of your sites. Keep track during development by setting up webhooks
in github to audit your site on every push to the `master` branch

## Frameworks
Datatbase: [mongodb](https://www.mongodb.com/)

Backend: [hapi](https://hapi.dev/)

Frontend: [Vue](https://vuejs.org/)

## Routes

[App](http://0.0.0.0:4000)

[Storybook](http://localhost:4000/storybook/index.html)

[Swagger](http://0.0.0.0:4000/documentation) (only for NODE_ENV=development)

## Screenshots
![Dashboard](doc/assets/dashboard.png)
![Project Detail View](doc/assets/project.png)

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
The worker checks the database for pending audits. If there are some, the lighthouse audit will be performed for those sites. 
Run the worker via `npm run worker`. I recommend to do this via a cronjob every 10 minutes.
So you can create new reports via the frontend and don't have to wait too long to be created.

### Run new audits
This command creates a new audit for every site configured. I recommend doing this every 6 to 12 hours.
Run the command via `npm run audit`


## Heroku
This app works perfectly fine with heroku and [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2).

In addition to the nodejs buildpack you need to add following ones for the worker to run correctly:
- https://github.com/heroku/heroku-buildpack-google-chrome
- https://github.com/heroku/heroku-buildpack-chromedriver

![Buildpacks](doc/assets/buildpacks.png)


## Development
First create a `.env` file in the project root.
It's content should be like shown below.

After that, you could start your local server with 
`npm run dev-server` which will restart after any change in the `/src` directory.
To constantly recompile the frontend just run `npm run dev` and all Vue, JS and SCSS assets are compiled
on changes.

## Docker
There is a functional `Dockerfile` in the project which you can use to host somewhere.
And with the `docker-compose up` command, you can spin up the whole dev environment.

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

name | required | type | description | example
---|---|---|---|---
LOGIN_PASS | `true` | `string` | used for login | foobar
JWT_SECRET | `true`| `string` | secret used for the jwt token | asdf123 
MONGODB_URI | `true` | `string` | URI for the DB connection | mongodb://admin:admin@database:27017/auditreports
PORT |  `true` | `number` | port number| 5000
SENTRY_DSN | `false` | `string` | sentry DSN string | https://776d9de9782447ae87ffbcc03d24f6ad@sentry.io/1890421
WINSTON_LOG_LEVEL | `false` | `info,debug,error` | Log level for the winston logger | info
IS_WORKER | `false` |`boolean` | Define if the worker should be started or the server | true
LHD_IGNORE_RAW |`false` | `boolean` | If this is defined, raw data from the audit wont be saved. You can't inspect the HTML of that report | false
G_ANALYTICS_ID | `false` |`string` | Google Analytics ID for tracking | `GA-XXXXX-X`
WINSTON_LOG_FILES |`false` | `boolean` | Define if logs should be stored in the `/logs` folder | `true`
GOOGLE_CHROME_BIN | `false` |`string` | Point to the chromium binary | is set by the buildpack
GOOGLE_CHROME_PORT |`false` | `number` | Define the port used for remote debugging | `9222`

## Reporters
There is functionallity built in to use 3rd party reporters like [quickmetrics.io](https://quickmetrics.io/).
To implement a new one simply add a new entry via `register` in the `/reporters/index.js` file.
You have to pass a function as a parameter in the `register` call. The functions 
accepts two parameters. An event name and some data. That function will get called 
in the code. 

Example of a reporter registration

    register((event, data) => {
        track(event, data);
    });


If you want to react to specific events, you can add logic inside that function body.
Find all events [here](/lib/reporter/Events.js).

    register((event, data) => {
        if(event === Event.SERVER_ERROR){
            track(event, data);
        }
    });

Built in reporters [here](/lib/reporter/integrations)

To use a built in reporter, import the desired reporter in the `/reporters/index.js` file, and 
pass the function to the `register` method.

Example with quickmetrics

    import { register } from '../lib/reporter';
    import qm from '../lib/reporter/integrations/quickmetrics';
    
    if (process.env.QUICK_METRICS_KEY) {
        register(qm(process.env.QUICK_METRICS_KEY));
    }

### Quickmetrics
To use the internal quickmetrics reporter you have to provide the env variable
`QUICK_METRICS_KEY` with your API access key 
