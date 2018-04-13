const path = require('path');
const request = require('request');
const Boom = require('boom');
let cachedResponse = {};

/**
 * Get artifacts by file type
 *
 * @param {string} type
 * @param {string} vcs
 * @param {string} username
 * @param {string} project
 * @param {string|number} build
 * @param {string} token
 * @return {*|PromiseLike<T>|Promise<T>}
 */
function getArtifactsByType(type, vcs, username, project, build = 'latest', token) {
    return getArtifacts(vcs, username, project, build, token)
        .then(artifacts => {
            return artifacts.filter(item => {
                return path.extname(item.path) === `.${type}` ? item : null;
            });
        });
}

/**
 * Get artifacts usable for dashboard chart
 *
 * @param {string} vcs
 * @param {string} username
 * @param {string} project
 * @param {string|number} build
 * @param {string} token
 * @return {*|PromiseLike<T>|Promise<T>}
 */
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

/**
 * GCheck if latest build of branch contains dashboard artifacts
 *
 * @param {string} vcs
 * @param {string} username
 * @param {string} project
 * @param {string} branch
 * @param {string} token
 * @return {*|PromiseLike<T>|Promise<T>}
 */
function checkIfProjectIsSupported(vcs, username, project, branch, token) {
    return getLatestBranchBuild(vcs, username, project, branch, token, 'successful')
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

/**
 * Sort projects by it's latest build timestamp
 *
 * @param {Object[]} projects
 * @param {string} branch
 * @param {string} token
 * @return {Promise<any[]>}
 */
function sortProjectByLatestBuild(projects, branch, token) {
    const p = [];
    for (let i = 0; i < projects.length; i++) {
        const projectConfig = projects[i];
        const {
            vcs,
            username,
            project,
        } = projectConfig;

        p.push(getLatestBranchBuild(vcs, username, project, branch, token)
            .then(data => {
                if (!data) {
                    return null;
                }
                const { stop_time, build_num } = data;
                projectConfig.buildIdentifier = build_num;
                return {
                    date: new Date(stop_time),
                    config: projectConfig
                };
            }));
    }

    return Promise.all(p)
        .then((all) => {
            all = all.filter((item) => {
                if (item) {
                    return item;
                }
            });
            all = all.sort((a, b) => {
                return a.date < b.date;
            });
            all = all.map((item) => {
                return item.config;
            });
            return all;
        });
}

/**
 * Get list of valid projects
 *
 * @param {string} token
 * @param {string} branch
 * @return {*}
 */
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
            return sortProjectByLatestBuild(projects, branch, token);
        })
        .then((projects) => {
            cachedResponse[branch] = projects;
            return projects;
        })
}

/**
 * Add token query param to artifact urls
 * @param {Object[]} artifacts
 * @param {string} token
 * @return {Array}
 */
function addTokenToHTMLArtifacts(artifacts, token) {
    if (!artifacts) {
        return [];
    }
    return artifacts.map((item) => {
        if (path.extname(item.path) === '.html') {
            item.url += `?circle_token=${token}`
        }
        return item;
    });
}

/**
 * Invalidate & rebuild projects cache
 *
 * @param {string} token
 * @param {string} branch
 * @return {*}
 */
function invalidateCache(token, branch) {
    cachedResponse[branch] = [];
    return getAllProjects(token, branch)
}

/**
 * Get all artifacts
 *
 * @param {string} vcs
 * @param {string} username
 * @param {string} project
 * @param {string|number} build
 * @param {string} token
 * @return {Promise<any>}
 */
function getArtifacts(vcs, username, project, build, token) {
    return new Promise((resolve, rej) => {
        request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/${build}/artifacts?circle-token=${token}&filter=completed`, { json: true }, (err, res, body) => {
            if (err) {
                return rej(Boom.boomify(err));
            }
            return resolve(addTokenToHTMLArtifacts(body, token));
        })
    })
        .then(artifacts => {
            artifacts = artifacts.map( (artifact) => {
                artifact.key = path.basename(artifact.path).split('.').shift();
                return artifact;
            });
            return artifacts;
        })
}

/**
 * Get all builds for branch
 *
 * @param {string} vcs
 * @param {string} username
 * @param {string} project
 * @param {string} branch
 * @param {string} token
 * @param {number} limit
 * @param {string} filter
 * @return {Promise<any>}
 */
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

/**
 * Get latest build for branch
 *
 * @param {string} vcs
 * @param {string} username
 * @param {string} project
 * @param {string} branch
 * @param {string} token
 * @param {string} filter
 * @return {Promise<any>}
 */
function getLatestBranchBuild(vcs, username, project, branch, token, filter = 'completed') {
    return getBranchBuilds(vcs, username, project, branch, token, 1, filter)
        .then((builds) => {
            return builds.shift();
        })
}

/**
 * Get build by number
 * @param {string} vcs
 * @param {string} username
 * @param {string} project
 * @param {number} build
 * @param {string} token
 * @return {Promise<any>}
 */
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

/**
 *
 * @param url
 * @param token
 * @return {Promise<any>}
 */
function getArtifactContent(url, token) {
    return new Promise((resolve, rej) => {
        request(`${url}?&circle-token=${token}`, { json: true }, (err, res, body) => {
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
    invalidateCache,
    getDashboardArtifacts,
    getArtifactContent
};
