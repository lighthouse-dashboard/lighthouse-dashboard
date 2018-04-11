const request = require('request');
const Boom = require('boom');
let cachedResponse = [];

module.exports.getAllProjects = function (token) {
    return new Promise((resolve, rej) => {
        if (cachedResponse.length > 0) {
            return resolve(cachedResponse)
        }
        request(`https://circleci.com/api/v1.1/projects?circle-token=${token}`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            cachedResponse = body;
            return resolve(body);
        });
    });
};

module.exports.getArtifacts = function (vcs, username, project, build, token) {
    return new Promise((resolve, rej) => {

        request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/${build}/artifacts?circle-token=${token}&filter=completed`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            return resolve(body);
        });
    });

};

module.exports.getBranchBuilds = function (vcs, username, project, branch, token, limit, filter= 'completed') {
    return new Promise((resolve, rej) => {
        request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/tree/${branch}?circle-token=${token}&limit=${limit}&filter=${filter}`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            return resolve(body);
        });
    });
};


module.exports.getBuild = function (vcs, username, project, build, token) {
    return new Promise((resolve, rej) => {

        request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/${build}?circle-token=${token}&filter=completed`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            return resolve(body);
        });
    });
};

