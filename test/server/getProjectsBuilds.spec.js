/* eslint-disable */

const request = require('request-promise');
const nock = require('nock');
const unit = require('unit.js');

const server = require('../../server');

const { SERVER, SECRET, BRANCH, API } = require('../config');

describe('getAllProjects', function () {
    after(async () => {
        return await server.stop();
    });

    it('get all projects', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/projects')
            .query(true)
            .reply(200, require('./data/getAllProjects'))

            .get('/project/github/test/test/13/artifacts')
            .query(true)
            .reply(200, require('./data/getBuildArtifacts'))

            .get('/project/github/test2/test2/43/artifacts')
            .query(true)
            .reply(200, require('./data/getBuildArtifacts'))

            .get('/project/github/test/test/tree/master')
            .query(true)
            .reply(200, require('./data/getProject'))

            .get('/project/github/test2/test2/tree/master')
            .query(true)
            .reply(200, require('./data/getProject'));


        return request({
            url: `${SERVER}/api/projects/${BRANCH}?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(2);
                const project = data.shift();
                unit.string(project.project).is('test2');

                unit.object(project).hasProperty('vcs');
                unit.object(project).hasProperty('username');
                unit.object(project).hasProperty('project');
                unit.object(project).hasProperty('lastBuild');
            });
    });
});
