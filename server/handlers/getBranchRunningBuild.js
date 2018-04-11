
const request = require('request');
const Boom = require('boom');

module.exports = async (req, h) => {
    return await new Promise((resolve, rej) => {
        const {vcs, username, project, branch} = req.params;
        const token = req.server.app.token;

        request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/tree/${branch}?circle-token=${token}&limit=1&filter=running`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            return resolve(body);
        });
    });
};
