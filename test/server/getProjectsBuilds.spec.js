/* eslint-disable */

const request = require('request-promise');
const nock = require('nock');
const unit = require('unit.js');

const { start, stop } = require('../../dist/server/server');

const { SERVER, SECRET, BRANCH, API } = require('../config');

describe('Builds', function () {
    before(async () => {
        return await start();
    });

    after(async () => {
        return await stop();
    });

    afterEach(() => {
        nock.cleanAll();
    })

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
                unit.array(data).hasLength(2);

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
            .reply(200, require('./data/test/project/project'));


        return request({
            url: `${SERVER}/api/projects/github/test/project/branch/master/running?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                console.log(data);
                unit.array(data).hasLength(1);

                const build = data.shift();

                unit.object(build).hasProperty('build_num');
            });
    });
});
