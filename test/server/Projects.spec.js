/* eslint-disable */

const request = require('request-promise');
const nock = require('nock');
const unit = require('unit.js');

const { start, stop } = require('../../dist/server/server');

const { SERVER, SECRET, BRANCH, API } = require('../config');

describe('Project', function () {
    before(async () => {
        return await start();
    });

    after(async () => {
        return await stop();
    });

    it('get all', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/projects')
            .query(true)
            .reply(200, require('./data/getAllProjects'))

            .get('/project/github/test/project/13/artifacts')
            .query(true)
            .reply(200, require('./data/test/project/13/artifacts'))

            .get('/project/github/test/project2/43/artifacts')
            .query(true)
            .reply(200, require('./data/test/project2/43/artifacts'))

            .get('/project/github/test/project/tree/master')
            .query(true)
            .reply(200, require('./data/test/project/project'))

            .get('/project/github/test/project2/tree/master')
            .query(true)
            .reply(200, require('./data/test/project2/project'));


        return request({
            url: `${SERVER}/api/projects/${BRANCH}?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(2);
                const project = data.shift();
                unit.string(project.project).is('project2');

                unit.object(project).hasProperty('vcs');
                unit.object(project).hasProperty('username');
                unit.object(project).hasProperty('project');
                unit.object(project).hasProperty('lastBuild');
            });
    });

    it('check sort order', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/projects')
            .query(true)
            .reply(200, require('./data/getAllProjects'))

            .get('/project/github/test/project/13/artifacts')
            .query(true)
            .reply(200, require('./data/test/project/13/artifacts'))

            .get('/project/github/test/project2/43/artifacts')
            .query(true)
            .reply(200, require('./data/test/project2/43/artifacts'))

            .get('/project/github/test/project/tree/master')
            .query(true)
            .reply(200, require('./data/test/project/project'))

            .get('/project/github/test/project2/tree/master')
            .query(true)
            .reply(200, require('./data/test/project2/project'));


        return request({
            url: `${SERVER}/api/projects/${BRANCH}?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(2);

                const project1 = data.shift();
                const project2 = data.shift();

                unit.string(project1.project).is('project2');
                unit.string(project2.project).is('project');
            });
    });

    it('check sort order 2', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/projects')
            .query(true)
            .reply(200, require('./data/getAllProjects2'))

            .get('/project/github/test/project/13/artifacts')
            .query(true)
            .reply(200, require('./data/test/project/13/artifacts'))

            .get('/project/github/test/project2/43/artifacts')
            .query(true)
            .reply(200, require('./data/test/project2/43/artifacts'))

            .get('/project/github/test/project/tree/master')
            .query(true)
            .reply(200, require('./data/test/project/project'))

            .get('/project/github/test/project2/tree/master')
            .query(true)
            .reply(200, require('./data/test/project2/project'));


        return request({
            url: `${SERVER}/api/projects/${BRANCH}?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(2);

                const project1 = data.shift();
                const project2 = data.shift();

                unit.string(project1.project).is('project');
                unit.string(project2.project).is('project2');
            });
    });

    it('get trend', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json',
            })
            .get('/project/github/test/project/tree/master')
            .query(true)
            .reply(200, require('./data/test/project/project'))

            .get('/project/github/test/project/13/artifacts')
            .query(true)
            .reply(200, require('./data/test/project/13/artifacts'))

            .get('/project/github/test/project/43/artifacts')
            .query(true)
            .reply(200, require('./data/test/project/43/artifacts'))

            .get('/0/lighthouse/desktop.20180303-062322__test.io__.dashboard.json')
            .query(true)
            .reply(200, require('./data/test/project/13/desktop.20180303-062322__test.io__.dashboard'))

            .get('/0/lighthouse/desktop.20180304-062322__test.io__.dashboard.json')
            .query(true)
            .reply(200, require('./data/test/project/43/desktop.20180304-062322__test.io__.dashboard'));


        return request({
            url: `${SERVER}/api/projects/github/test/project/branch/master/trending?access_token=${SECRET}`
        })
            .then((data) => {
                const report = JSON.parse(data);
                const build = report['desktop:https://test.io/'];
                unit.object(build).hasProperty('trend');
                unit.object(build).hasProperty('series');

                const trend = build.trend;

                unit.object(trend).hasProperty('performance');
                unit.object(trend).hasProperty('pwa');
                unit.object(trend).hasProperty('accessibility');
                unit.object(trend).hasProperty('best-practices');
                unit.object(trend).hasProperty('seo');
            });
    });
});
