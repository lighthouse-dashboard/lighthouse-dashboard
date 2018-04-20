/* eslint-disable */

const request = require('request-promise');
const nock = require('nock');
const unit = require('unit.js');

const server = require('../../server');

const { SERVER, SECRET, API } = require('../config');

describe('Trend', function () {
    after(async () => {
        return await server.stop();
    });

    it('get', () => {
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
