const { orderBy } = require('lodash');

const { getListOfProjects, getBuildsForProject, getArtifactContent, getArtifactsForBuild, getBuild, invalidateProjectsCache } = require('./api');
const { filterSupportedProjects, getArtifactsForBuilds, loadArtifactsContentForBuilds } = require('./helpers');
const { calculateTrendForSeries, setupSeriesData } = require('./trendUtils');
const { buildChartDataFromTaggedResults, groupResultsByReportTag } = require('./chartDataUtils');

function getProjects(branch, token) {
    return getListOfProjects(branch, token)
        .then((projects) => {
            return filterSupportedProjects(projects, branch, token);
        });
}

function getBuildByNum(vcs, username, project, build, token) {
    return getBuild(vcs, username, project, build, token);
}

function getLatestBuildsForProject(vcs, username, project, branch, token, limit, filter = 'completed') { //eslint-disable-line
    return getBuildsForProject(vcs, username, project, branch, token, limit, filter);
}

function getBuilds(vcs, username, project, branch, token, limit) { //eslint-disable-line
    return getBuildsForProject(vcs, username, project, branch, token, limit)
        .then((builds) => {
            return orderBy(builds, ['build_num']);
        });
}

function getProjectTrendData(vcs, username, project, branch, token) {
    return getBuilds(vcs, username, project, branch, token, 2)
        .then((builds) => {
            return getArtifactsForBuilds(builds, vcs, username, project, token);
        })
        .then((builds) => {

            return loadArtifactsContentForBuilds(builds, token);
        })
        .then((builds) => {
            return setupSeriesData(builds);
        })
        .then((data) => {
            return calculateTrendForSeries(data);
        });
}

function getHistoryData(vcs, username, project, branch, token, limit) {  //eslint-disable-line
    return getBuilds(vcs, username, project, branch, token, limit)
        .then((builds) => {
            return getArtifactsForBuilds(builds, vcs, username, project, token);
        })
        .then((builds) => {
            return loadArtifactsContentForBuilds(builds, token);
        })
        .then((builds) => {
            return setupSeriesData(builds);
        });
}

function getArtifact(url, token) {
    return getArtifactContent(url, token);
}

function getArtifactListForBuild(vcs, username, project, build, token) {
    return getArtifactsForBuild(vcs, username, project, build, token);
}

function deleteProjectsCache(branch) {
    return invalidateProjectsCache(branch);
}


function getBuildChartData(vcs, username, project, build, token) {
    return getArtifactsForBuilds([{ build_num: build }], vcs, username, project, token)
        .then((builds) => {
            return loadArtifactsContentForBuilds(builds, token);
        })
        .then((data) => {
            return data.shift();
        })
        .then((buildData) => {
            return groupResultsByReportTag(buildData);
        })
        .then((data) => {
            return buildChartDataFromTaggedResults(data);
        });
}

module.exports = {
    getProjects,
    getLatestBuildsForProject,
    getProjectTrendData,
    getHistoryData,
    getArtifact,
    getArtifactListForBuild,
    getBuildByNum,
    deleteProjectsCache,
    getBuildChartData
};
