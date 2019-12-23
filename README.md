# lighthouse-dashboard

[Web](https://dreihouse.dreipol.ch/#/)

# Frontend
## Running
When you start the docker container a small node server starts. This server also requires the env variable `CIRCLE_TOKEN`.
After starting your server you can access the dashboard via `http://localhost:3000`

## Development
To start debugging or enhancing the app you don't have to use docker.
First create a `.env` file in the project root.
It's content should be like this

    CIRCLE_TOKEN=<API_TOKEN>

This token is used in the server and the app

Now you can start the server with

    npm run server

or

    npm run server-dev

and start the frontend app with

    npm run dev

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
PORT=3000
BASIC_PASS='foo'
SECRET='foo'
CIRCLE_TOKEN='992df13948558e1e264c382221a4215eabce90da'
MONGO_DB_URL='mongodb://admin:admin@localhost:27017'
MONGO_DB_NAME='auditreports'
SHOW_ERROR_PAGES=true

```

# Todo
 - [x] Add Templating
 - [x] Add method to get all assets
 - [x] Create Chart for all assets with speed index
 - [x] Make audits run in docker
 - [ ] Create overview for the latest n projects built
 - [x] Make UI to add/ remove projects (stored in db)
 - [ ] Host somewhere
 - [x] Add cronjobs
 - [ ] Secure api requests with access token loaded from ENV
 - [ ] Add unit tests
 - [ ] Add toggle to site to indicate if it should be shown in the overview
 - [x] Add order indicator to `SiteConfig` for reordering items
 - [ ] Add pm2 for restarts after crash
 - [ ] Improve logging for development
 - [ ] Create dashboard view which only shows favorited projects
 - [ ] Create view for all projects without speed overview
 - [ ] Add swagger API doc
