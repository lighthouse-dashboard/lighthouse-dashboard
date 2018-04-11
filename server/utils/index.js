const path = require('path');
const request = require('request');
const Boom = require('boom');
let cachedResponse = {};

function getArtifactsByType(type, vcs, username, project, build = 'latest', token) {
    return getArtifacts(vcs, username, project, build, token)
        .then(artifacts => {
            return artifacts.filter(item => {
                return path.extname(item.path) === `.${type}` ? item : null;
            });
        });
}

function getDashboardArtifacts(vcs, username, project, build, token) {
    return getArtifactsByType('json', vcs, username, project, build, token)
        .then(artifacts => {
            return artifacts.filter((item) => {
                if (path.basename(item.path).indexOf('.dashboard.') !== -1) {
                    return item;
                }
            });
        });
}

function checkIfProjectIsSupported(vcs, username, project, branch, token) {
    return getBranchBuilds(vcs, username, project, branch, token)
        .then((build) => {
            if (!build) {
                return [];
            }
            return getDashboardArtifacts(vcs, username, project, build.build_num, token);
        })
        .then(artifacts => {
            if (!artifacts || artifacts.length <= 0) {
                return false;
            }

            return true;
        });
}

function getAllProjects(token, branch) {
    if (cachedResponse[branch] && cachedResponse[branch].length > 0) {
        return Promise.resolve(cachedResponse[branch]);
    }

    return new Promise((resolve, rej) => {
        request(`https://circleci.com/api/v1.1/projects?circle-token=${token}`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            return resolve(body);
        });
    })
        .then((projects) => {
            const p = projects.map((project) => {
                return checkIfProjectIsSupported('github', project.username, project.reponame, branch, token)
                    .then((isSupported) => {
                        if (!isSupported) {
                            return
                        }

                        return {
                            vcs: 'github',
                            username: project.username,
                            project: project.reponame
                        };
                    })
            });
            return Promise.all(p);
        })
        .then(projects => {
            return projects.filter((item) => {
                if (item) {
                    return item;
                }
            })
        })
        .then((projects) => {
            cachedResponse[branch] = projects;
            return projects;
        })
}

function invalidateCache(token, branch){
    cachedResponse[branch] = [];
    return getAllProjects(token, branch)
}

function getArtifacts(vcs, username, project, build, token) {
    return new Promise((resolve, rej) => {
        request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/${build}/artifacts?circle-token=${token}&filter=completed`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            return resolve(body);
        });
    });
}

function getBranchBuilds(vcs, username, project, branch, token, limit, filter = 'completed') {
    return new Promise((resolve, rej) => {
        request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/tree/${branch}?circle-token=${token}&limit=${limit}&filter=${filter}`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            return resolve(body);
        });
    });
}

function getBuild(vcs, username, project, build, token) {
    return new Promise((resolve, rej) => {
        request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/${build}?circle-token=${token}&filter=completed`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            return resolve(body);
        });
    });
}

module.exports = {
    getAllProjects,
    getArtifacts,
    getBranchBuilds,
    getBuild,
    invalidateCache
};
