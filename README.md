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

## Config
All config is stored in `src/config.js`

# Docker
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
 - BASIC_PASS - password for basic auth (md5 hashed password)
 - CIRCLE_TOKEN - circle ci token
 - PORT - port for the server
 - LIMIT - limit of build numbers fetched
 - NO_AUTH=1 - can beused to disable basic auth for local development
