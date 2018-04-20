let cachedResponse = [];
const request = require('request-promise');

function getListOfProjects(branch, token) {
    if (cachedResponse[branch] && cachedResponse[branch].length > 0) {
        return Promise.resolve(cachedResponse[branch]);
    }

    return request(`https://circleci.com/api/v1.1/projects?circle-token=${ token }`, { json: true })
        .then(data => {
            return data;
        });
}


function getArtifactsForBuild(vcs, username, project, build, token) {
    return request(`https://circleci.com/api/v1.1/project/${ vcs }/${ username }/${ project }/${ build }/artifacts?circle-token=${ token }&filter=completed`, { json: true })
        .then((data) => {
            return data;
        });
}

module.exports = {
    getListOfProjects,
    getArtifactsForBuild,
};
