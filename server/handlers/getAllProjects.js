
const request = require('request');
const Boom = require('boom');

module.exports = async (req, h) => {
    return await new Promise((resolve, rej) => {
        request(`https://circleci.com/api/v1.1/projects?circle-token=${req.server.app.token}`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            return resolve(body);
        });
    });
};
