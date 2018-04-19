const request = require('request-promise');
const nock = require('nock');
const unit = require('unit.js');

const server = require('../../server');

const { SERVER, SECRET, BRANCH, API } = require('../config');

describe('Routes', function () {
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

            .get('/project/github/test/test/tree/master')
            .query(true)
            .reply(200, require('./data/getProject'));


        return request({
            url: `${SERVER}/api/projects/${BRANCH}?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(1);
                unit.array(data).is([{
                    vcs: 'github',
                    username: 'test',
                    project: 'test',
                    buildIdentifier: 13
                }])
            })
    });

    it('get Branch Builds', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/test/tree/master')
            .query(true)
            .reply(200, require('./data/getProject'));


        return request({
            url: `${SERVER}/api/projects/github/test/test/branch/${BRANCH}?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(2);

                const build = data.shift();

                unit.object(build).hasProperty('build_num');
            });
    });

    it('get branch latest build', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/test/tree/master')
            .query(true)
            .reply(200, require('./data/getLatestProjectBuild'));


        return request({
            url: `${SERVER}/api/projects/github/test/test/branch/master/latest?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(1);

                const build = data.shift();

                unit.object(build).hasProperty('build_num');
            });
    });

    it('get branch running build', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/test/tree/master')
            .query(true)
            .reply(200, require('./data/getProjectRunningBuild'));


        return request({
            url: `${SERVER}/api/projects/github/test/test/branch/master/running?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(1);

                const build = data.shift();

                unit.object(build).hasProperty('build_num');
            });
    });

    it('get build artifacts', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/test/13/artifacts')
            .query(true)
            .reply(200, require('./data/getBuildArtifacts'))

            .get('/0/lighthouse/desktop.json')
            .query(true)
            .reply(200, require('./data/artifacts/desktop.20180303-062322__test.io__.dashboard'));


        return request({
            url: `${SERVER}/api/projects/github/test/test/build/13/artifacts?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(1);

                const artifact = data.shift();

                unit.object(artifact).hasProperty('url');
                unit.object(artifact).hasProperty('path');
            });
    });

    it('get dashbord artifacts', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })
            .get('/project/github/test/test/tree/master')
            .query(true)
            .reply(200, require('./data/getProject'))

            .get('/project/github/test/test/13/artifacts')
            .query(true)
            .reply(200, require('./data/getBuildArtifacts'))

            .get('/project/github/test/test/13/artifacts')
            .query(true)
            .reply(200, require('./data/getBuildArtifacts'))

            .get('/0/lighthouse/desktop.json')
            .query(true)
            .reply(200, require('./data/artifacts/desktop.20180303-062322__test.io__.dashboard'))


        return request({
            url: `${SERVER}/api/projects/github/test/test/branch/master/dashboardartifacts?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(2);

                const build = data.shift();

                unit.object(build).hasProperty('build_num');
                unit.object(build).hasProperty('artifacts');
                unit.object(build).hasProperty('artifactContent');
            });
    });

    it('get branch build info', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/test/13')
            .query(true)
            .reply(200, require('./data/getSingleBuild'));

        return request({
            url: `${SERVER}/api/projects/github/test/test/build/13?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.object(data).isNot(null);
                unit.object(data).hasProperty('build_num');
                unit.object(data).hasProperty('subject');
                unit.object(data).hasProperty('user');
                unit.object(data).hasProperty('build_time_millis');
                unit.object(data).hasProperty('status');
                unit.object(data).hasProperty('stop_time');
            });
    });


    it('get project trends', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })
            .get('/project/github/test/test/tree/master')
            .query(true)
            .reply(200, require('./data/getProject'))

            .get('/project/github/test/test/13/artifacts')
            .query(true)
            .reply(200, require('./data/getBuildArtifacts'))

            .get('/project/github/test/test/13/artifacts')
            .query(true)
            .reply(200, require('./data/getBuildArtifacts'))

            .get('/0/lighthouse/desktop.json')
            .query(true)
            .reply(200, require('./data/artifacts/desktop.20180303-062322__test.io__.dashboard'))

            .get('/0/lighthouse/desktop.json')
            .query(true)
            .reply(200, require('./data/artifacts/desktop.20180303-062322__test.io__.dashboard'))


        return request({
            url: `${SERVER}/api/projects/github/test/test/branch/master/trending?access_token=${SECRET}`
        })
            .then((data) => {
                const build = JSON.parse(data);

                unit.object(build).hasProperty('performance');
                unit.object(build).hasProperty('pwa');
                unit.object(build).hasProperty('accessibility');
                unit.object(build).hasProperty('best-practices');
                unit.object(build).hasProperty('seo');
            });
    });


});
