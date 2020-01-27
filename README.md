# lighthouse-dashboard
[![CircleCI](https://circleci.com/gh/dreipol/lighthouse-dashboard.svg?style=svg&circle-token=fa73435956cf491fcc4005ad5143e00ebf6871fa)](https://circleci.com/gh/dreipol/lighthouse-dashboard)
<a href="https://codeclimate.com/repos/5e130cad7a81c501b700c473/maintainability"><img src="https://api.codeclimate.com/v1/badges/d151a3e60f81d7afcb6b/maintainability" /></a>
<a href="https://codeclimate.com/repos/5e130cad7a81c501b700c473/test_coverage"><img src="https://api.codeclimate.com/v1/badges/d151a3e60f81d7afcb6b/test_coverage" /></a>

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



# Todo Future Features (v2...)
- [ ] Add custom scripts for each project to add logins for lockdown pages(scripts will be executed in the browser)
- [ ] Make project active/disabled in settings menu of project 
- [ ] Add fullscreen option of single chart, section and page
- [ ] Add different webhooks endpoints for different environments (circleCI, Gitlab, Github, others...)
- [ ] Add storybook 
- [ ] Add scss files to build process
- [ ] Add custom styling and remove Vuetify
- [ ] Make Neumorpic UI [example](https://dribbble.com/shots/9440651-Todo-List-Neuromorphic-UI-Design)

# Todo v1
 - [ ] FE: Show latest commit infos in seperate overlay
 - [ ] FE: Add url for webhooks to settings menu of project
 - [ ] FE: Add icon/logo
 - [ ] FE: Use cookie instead of localstorage to store the JWT
 - [ ] FE: Add search for project list
 - [ ] BE: Add more logging 
 - [ ] BE: Add unit tests
 - [ ] BE: Add pm2 for restarts after crash
 - [ ] Create awesome doc

## Done
 - [x] Add additional properties `message` and/or `git_commit` to the webhook api
 - [x] Add autorefresh to all charts
 - [x] Improve login page
 - [x] Add loaders
 - [x] Improve logging for development
 - [x] Add sites data to vuex state for immediate mutations & changes 
 - [x] Add config file validator
 - [x] Add toggle to site to indicate if it should be shown in the overview 
 - [x] Add feed of latest built project to the overview
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

