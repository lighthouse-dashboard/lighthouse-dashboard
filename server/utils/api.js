let cachedResponse = [];
const request = require('request-promise');

function getListOfProjects(branch, token) {
    if (cachedResponse[branch] && cachedResponse[branch].length > 0) {
        return Promise.resolve(cachedResponse[branch]);
    }

    return request(`https://circleci.com/api/v1.1/projects?circle-token=${ token }`, { json: true })
        .then((data) => {
            cachedResponse[branch] = data;
            return data;
        });
}

function invalidateProjectsCache(branch) {
    cachedResponse[branch] = [];
    return Promise.resolve();
}

function getBuildsForProject(vcs, username, project, branch, token, limit, filter = 'completed') { //eslint-disable-line
    return request(`https://circleci.com/api/v1.1/project/${ vcs }/${ username }/${ project }/tree/${ branch }?circle-token=${ token }&limit=${ limit }&filter=${ filter }`, { json: true });

}

function getArtifactsForBuild(vcs, username, project, build, token) {
    return request(`https://circleci.com/api/v1.1/project/${ vcs }/${ username }/${ project }/${ build }/artifacts?circle-token=${ token }&filter=completed`, { json: true })
}

function getBuild(vcs, username, project, build, token) {
    return request(`https://circleci.com/api/v1.1/project/${ vcs }/${ username }/${ project }/${ build }?circle-token=${ token }`, { json: true });
}

function getArtifactContent(url) {
    return request(url, { json: true });
}

module.exports = {
    getListOfProjects,
    getArtifactsForBuild,
    getBuildsForProject,
    getArtifactContent,
    getBuild,
    invalidateProjectsCache,
};
