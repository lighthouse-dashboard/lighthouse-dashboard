# lighthouse-dashboard

[Web](https://dreihouse.dreipol.ch/#/)

# Framework
Backend: [hapi](https://hapi.dev/)

Frontend: [Vue](https://vuejs.org/) & [Vuetiy](https://vuetifyjs.com/en/)

# Config
Most config should be in `/dashboard.config.js` whether it is backend or UI

# Development
To start debugging or enhancing the app you don't have to use docker.
First create a `.env` file in the project root.
It's content should be like shown below.

In addition to that, you need a mongodb. You could start the dev environment with `docker-compose up`
which will start the mongodb and the server on port 5000. After that, you could start your local server with 
`npm run server-dev`. After setting the correct connection string, your local server should connect to the mongo container.
Now you have a local server running which will be restarted (with nodemon) after every change.
If you want to work on the UI you can start the UI with  `npm run serve`. This will create a new app, which is proxy you
already running local server.


# Docker
Inside the docker, the app is managed by [pm2](https://pm2.keymetrics.io/) in order to restart after it crashes
## Docker Build

    docker build --build-arg CIRCLE_TOKEN=<TOKEN> . -t dreipol/dreihouse-dashboard

## Docker Run

    docker run --name dashboard -p 3000:3000 -e CIRCLE_TOKEN=<TOKEN> dreipol/dreihouse-dashboard

# Deployments
## Remotes
```bash
git remote add deis dokku@furio.drei.io:lighthouse-dashboard
```

## deploy
```bash
git push deis master
```

# Env Vars
```
PORT=4000
API_TOKEN='foo'
MONGO_DB_URL='mongodb://admin:admin@localhost:27017'
MONGO_DB_NAME='auditreports'
SHOW_ERROR_PAGES=true
```

# Todo
 - [x] Add feed of latest built project to the overview
 - [ ] Add loaders
 - [ ] Host somewhere
 - [ ] Add unit tests
 - [x] Add toggle to site to indicate if it should be shown in the overview
 - [ ] Add pm2 for restarts after crash
 - [ ] Improve logging for development
 - [x] Add config file validator
 - [ ] Create awesome doc
 - [x] Add sites data to vuex state for immediate mutations & changes
 - [ ] Add search for project list
 - [ ] Make project active/disabled in settings menu of project
 - [ ] Add url for webhooks to settings menu of project
 
 - [x] Improve JWT token usage with vuex or so
 - [x] Add swagger API doc
 - [x] Create overview for the latest n projects built
 - [x] Add Templating
 - [x] Add method to get all assets
 - [x] Create Chart for all assets with speed index
 - [x] Make audits run in docker 
 - [x] Make UI to add/ remove projects (stored in db)
 - [x] Add cronjobs
 - [x] Secure api requests with access token loaded from ENV
 - [x] Add order indicator to `SiteConfig` for reordering items 
 - [x] Create dashboard view which only shows favorited projects
 - [x] Create view for all projects without speed overview

