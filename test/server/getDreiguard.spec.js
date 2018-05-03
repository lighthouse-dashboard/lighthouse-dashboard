/* eslint-disable */

const request = require('request-promise');
const nock = require('nock');
const unit = require('unit.js');

const { start, stop } = require('../../dist/server/server');

const { SERVER, SECRET, API } = require('../config');

describe('Dreiguard', function () {
    before(async () => {
        return await start();
    });

    after(async () => {
        return await stop();
    });

    it('get diff report', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/project/66/artifacts')
            .query(true)
            .reply(200, require('./data/test/project/66/artifacts'))

            .get('/0/dreiguard/dreipol.ch.json')
            .query(true)
            .reply(200, require('./data/test/project/66/dreipol.ch'))

        return request({
            url: `${SERVER}/api/projects/github/test/project/build/66/dreiguard?access_token=${SECRET}`
        })
            .then((data) => {
                const reportFiles = JSON.parse(data);
                unit.array(reportFiles).hasLength(1);

                const reports = reportFiles[0];
                unit.array(reports).hasLength(4);

                const report = reports[0];
                unit.object(report).hasProperty('compareFiles');
                unit.object(report).hasProperty('diff');
                unit.object(report).hasProperty('source');
                unit.object(report).hasProperty('reference');
            });
    });

    it('get diff images', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/project/66/artifacts')
            .query(true)
            .reply(200, require('./data/test/project/66/artifacts'))

            .get('/0/dreiguard/dreipol.ch.json')
            .query(true)
            .reply(200, require('./data/test/project/66/dreipol.ch'))

        return request({
            url: `${SERVER}/api/projects/github/test/project/build/66/dreiguard/diffs?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                console.log(data);
                unit.array(data).hasLength(4);
            });
    });

    it.skip('get screenshot images', () => {
        nock(API)
            .defaultReplyHeaders({
                'Content-Type': 'application/json'
            })

            .get('/project/github/test/project/66/artifacts')
            .query(true)
            .reply(200, require('./data/test/project/66/artifacts'))

            .get('/0/dreiguard/dreipol.ch.json')
            .reply(200, require('./data/test/project/66/dreipol.ch'))


        return request({
            url: `${SERVER}/api/projects/github/test/project/build/66/dreiguard/screenshots?access_token=${SECRET}`
        })
            .then((data) => {
                data = JSON.parse(data);
                unit.array(data).is(require('./data/test/project/66/screenshots'));
            });
    });

});
