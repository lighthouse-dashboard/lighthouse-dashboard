/* eslint-disable */

const request = require('request-promise');
const nock = require('nock');
const unit = require('unit.js');

const { start, stop } = require('../../dist/server/server');

const { SERVER, SECRET, API } = require('../config');

describe('Dreihouse', function () {
    before(async () => {
        return await start();
    });

    after(async () => {
        return await stop();
    });

    it('get build result', () => {
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


            .get('/0/lighthouse/desktop.20180303-062322__test.io__.dashboard.json')
            .query(true)
            .reply(200, require('./data/test/project/13/desktop.20180303-062322__test.io__.dashboard'))


        return request({
            url: `${SERVER}/api/projects/github/test/project/build/13/dreihouse?access_token=${SECRET}`
        })
            .then((data) => {
                const report = JSON.parse(data);
                const build = report['desktop:https://test.io/'];
                unit.object(build).hasProperty('performance');
                const performance = build.performance;
                unit.object(performance).hasProperty('score');
                unit.object(performance).hasProperty('budget');
            });
    });
});
