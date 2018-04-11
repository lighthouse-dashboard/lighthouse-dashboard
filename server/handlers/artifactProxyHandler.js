
const request = require('request');
const Boom = require('boom');

module.exports = async (req, h) => {
    const { url } = req.query;
    return await new Promise((resolve, rej) => {
        request(`${url}?&circle-token=${req.server.app.token}`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            return resolve(body);
        });
    });
};
