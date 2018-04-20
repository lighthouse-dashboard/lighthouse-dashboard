/* eslint-disable */

const request = require('request-promise');
const nock = require('nock');
const unit = require('unit.js');

const server = require('../../server');

const { SERVER, SECRET, BRANCH, API } = require('../config');

describe('Builds', function () {
    after(async () => {
        return await server.stop();
    });

    it('get build', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/project/tree/master')
            .query(true)
            .reply(200, require('./data/test/project/project'));


        return request({
            url: `${SERVER}/api/projects/github/test/project/branch/${BRANCH}?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(2);

                const build = data.shift();

                unit.object(build).hasProperty('build_num');
            });
    });


    it('get latest build', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/project/tree/master')
            .query(true)
            .reply(200, require('./data/test/project/lastBuild'));


        return request({
            url: `${SERVER}/api/projects/github/test/project/branch/master/latest?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(1);

                const build = data.shift();

                unit.object(build).hasProperty('build_num');
            });
    });

    it('get running build', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/project/tree/master')
            .query(true)
            .reply(200, require('./data/test/project/runningBuild'));


        return request({
            url: `${SERVER}/api/projects/github/test/project/branch/master/running?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(1);

                const build = data.shift();

                unit.object(build).hasProperty('build_num');
            });
    });


    it('get specific build', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/project/43')
            .query(true)
            .reply(200, require('./data/test/project/43/build'));

        return request({
            url: `${SERVER}/api/projects/github/test/project/build/43?access_token=${SECRET}`
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


});
