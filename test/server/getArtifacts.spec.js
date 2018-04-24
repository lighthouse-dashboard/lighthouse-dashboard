/* eslint-disable */

const request = require('request-promise');
const nock = require('nock');
const unit = require('unit.js');

const { start, stop } = require('../../dist/server/server');

const { SERVER, SECRET, API } = require('../config');

describe('Artifacts', function () {
    before(async () => {
        return await start();
    });

    after(async () => {
        return await stop();
    });

    it('get build artifacts', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/project/13/artifacts')
            .query(true)
            .reply(200, require('./data/test/project/13/artifacts'))

            .get('/0/lighthouse/desktop.20180303-062322__test.io__.dashboard.json')
            .query(true)
            .reply(200, require('./data/test/project/13/desktop.20180303-062322__test.io__.dashboard'));


        return request({
            url: `${SERVER}/api/projects/github/test/project/build/13/artifacts?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).hasLength(1);

                const artifact = data.shift();

                unit.object(artifact).hasProperty('url');
                unit.object(artifact).hasProperty('path');
            });
    });

    it('get history data', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
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
            url: `${SERVER}/api/projects/github/test/project/branch/master/history?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);

                unit.object(data).hasProperty('desktop:https://test.io/');
            });
    });



});
