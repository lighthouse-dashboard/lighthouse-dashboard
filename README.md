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

## API DOC
There is `swagger` includet to create th API documentation. This is only available when the environment varable `NODE_ENV` is set to `development`.
When running `npm run server-dev` this is done automatically

[http://localhost:3000/documentation](http://localhost:3000/documentation)

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
 - BASIC_PASS - password for login page (md5 hashed password)
 - SECRET - secret key for api bearer
 - CIRCLE_TOKEN - circle ci token
 - PORT - port for the server
 - LIMIT - limit of build numbers fetched

# Add new project
- Add the project to circleci
- Configure the project so it runs with [`deihouse`](https://www.npmjs.com/package/@dreipol/lighthouse-runner)
- Make sure that the `dreipoldev` account has access to it (circleci & github)
- Clear the cash in the dashboard
