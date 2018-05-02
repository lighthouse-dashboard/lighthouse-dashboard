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
});
