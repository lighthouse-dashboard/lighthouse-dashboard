const { getListOfProjects, getBuildsForProject } = require('./api');
const { filterSupportedProjects, getArtifactsForBuilds, loadArtifactsContentForBuilds } = require('./helpers');
const { calculateTrendForSeries, setupSeriesData } = require('./trendUtils');

function getProjects(branch, token) {
    return getListOfProjects(branch, token)
        .then((projects) => {
            return filterSupportedProjects(projects, branch, token);
        });
}

function getLatestBuildsForProject(vcs, username, project, branch, token, limit, filter = 'completed') { //eslint-disable-line
    return getBuildsForProject(vcs, username, project, branch, token, limit, filter);
}

function getProjectTrendData(vcs, username, project, branch, token) {
    return getBuildsForProject(vcs, username, project, branch, token, 2)
        .then((builds) => {
            return getArtifactsForBuilds(builds, vcs, username, project, token);
        })
        .then((builds) => {
            return loadArtifactsContentForBuilds(builds, vcs, username, project, token);
        })
        .then((builds) => {
            return setupSeriesData(builds);
        })
        .then((builds) => {
            return calculateTrendForSeries(builds);
        });
}

function getHistoryData(vcs, username, project, branch, token, limit) {  //eslint-disable-line
    return getBuildsForProject(vcs, username, project, branch, token, limit)
        .then((builds) => {
            return getArtifactsForBuilds(builds, vcs, username, project, token);
        })
        .then((builds) => {
            return loadArtifactsContentForBuilds(builds, vcs, username, project, token);
        })
        .then((builds) => {
            return setupSeriesData(builds);
        })
}

module.exports = {
    getProjects,
    getLatestBuildsForProject,
    getProjectTrendData,
    getHistoryData,
};
