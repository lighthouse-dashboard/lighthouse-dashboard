import {
    BuildInterface,
    CircleArtifactInterface,
    CircleProjectInterface,
    CircleReportContentInterface,
    TaggedBuildDataInterface,
    TaggedBuildDataSeriesInterface,
    TagGroupedArtifactDataInterface
} from "../Interfaces";

const {orderBy} = require('lodash');

const {getListOfProjects, getBuildsForProject, getArtifactContent, getArtifactsForBuild, getBuild, invalidateProjectsCache} = require('./api');
const {filterSupportedProjects, getArtifactsForBuilds, loadArtifactsContentForBuilds} = require('./helpers');
const {calculateTrendForSeries, setupSeriesData} = require('./trendUtils');
const {buildChartDataFromTaggedResults, groupResultsByReportTag} = require('./chartDataUtils');

function getProjects(branch: string, token: string): Promise<CircleProjectInterface[]> {
    return getListOfProjects(branch, token)
        .then((projects: CircleProjectInterface[]) => {
            return filterSupportedProjects(projects, branch, token);
        });
}

function getBuildByNum(vcs: string, username: string, project: string, build: number | string, token: string): Promise<CircleProjectInterface> {
    return getBuild(vcs, username, project, build, token);
}

function getLatestBuildsForProject(vcs: string, username: string, project: string, branch: string, token: string, limit: number, filter: string = 'completed'): Promise<BuildInterface[]> { //eslint-disable-line
    return getBuildsForProject(vcs, username, project, branch, token, limit, filter);
}

function getBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<BuildInterface[]> { //eslint-disable-line
    return getBuildsForProject(vcs, username, project, branch, token, limit)
        .then((builds: BuildInterface[]) => {
            return orderBy(builds, ['build_num']);
        });
}

function getProjectTrendData(vcs: string, username: string, project: string, branch: string, token: string): Promise<TaggedBuildDataInterface> {
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

function getHistoryData(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<TaggedBuildDataSeriesInterface> {  //eslint-disable-line
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

function getArtifact(url: string, token: string): Promise<CircleReportContentInterface> {
    return getArtifactContent(url, token);
}

function getArtifactListForBuild(vcs: string, username: string, project: string, build: number | string, token: string): Promise<CircleArtifactInterface[]> {
    return getArtifactsForBuild(vcs, username, project, build, token);
}

function deleteProjectsCache(branch: string) {
    return invalidateProjectsCache(branch);
}


function getBuildChartData(vcs: string, username: string, project: string, build: number | string, token: string) {
    return getArtifactsForBuilds([{build_num: build}], vcs, username, project, token)
        .then((builds: BuildInterface[]) => {
            return loadArtifactsContentForBuilds(builds, token);
        })
        .then((data:BuildInterface[]) => {
            return data.shift();
        })
        .then((buildData: BuildInterface) => {
            return groupResultsByReportTag(buildData);
        })
        .then((data: TagGroupedArtifactDataInterface) => {
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
