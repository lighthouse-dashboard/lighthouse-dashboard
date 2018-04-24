import {
    BuildInterface,
    CircleArtifactInterface,
    CircleBuildInterface,
    CircleProjectInterface,
    CircleReportContentInterface, GroupedBuildReports,
    ProjectArtifactTagData,
    ProjectInterface,
    ProjectSeriesData,
} from "../Interfaces";

const {orderBy} = require('lodash');

const {getListOfProjects, getBuildsForProject, getArtifactContent, getArtifactsForBuild, getBuild, invalidateProjectsCache} = require('./api');
const {filterSupportedProjects, getArtifactsForBuilds, loadArtifactsContentForBuilds, transformProjects} = require('./helpers');
const {calculateTrendForSeries, setupSeriesData} = require('./trendUtils');
const {buildChartDataFromTaggedResults, groupResultsByReportTag} = require('./chartDataUtils');

export function getProjects(branch: string, token: string): Promise<ProjectInterface[]> {
    return getListOfProjects(branch, token)
        .then((projects: CircleProjectInterface[]) => {
            return filterSupportedProjects(projects, branch, token);
        })
        .then((projects: CircleProjectInterface[]) => {
            return transformProjects(projects, branch)
        })
        .then((projects: ProjectInterface[]) => {
            return orderBy(projects, ['lastBuild.pushed_at'], ['desc'])
        })
}

export function getBuildByNum(vcs: string, username: string, project: string, build: number | string, token: string): Promise<CircleBuildInterface> {
    return getBuild(vcs, username, project, build, token);
}

export function getLatestBuildsForProject(vcs: string, username: string, project: string, branch: string, token: string, limit: number, filter: string = 'completed'): Promise<CircleBuildInterface[]> {
    return getBuildsForProject(vcs, username, project, branch, token, limit, filter);
}

export function getBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<CircleBuildInterface[]> {
    return getBuildsForProject(vcs, username, project, branch, token, limit)
        .then((builds: BuildInterface[]) => {
            return orderBy(builds, ['build_num']);
        });
}

export function getProjectTrendData(vcs: string, username: string, project: string, branch: string, token: string): Promise<ProjectSeriesData> {
    return getBuilds(vcs, username, project, branch, token, 10)
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

export function getHistoryData(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<ProjectArtifactTagData> {
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

export function getArtifact(url: string, token: string): Promise<CircleReportContentInterface> {
    return getArtifactContent(url, token);
}

export function getArtifactListForBuild(vcs: string, username: string, project: string, build: number | string, token: string): Promise<CircleArtifactInterface[]> {
    return getArtifactsForBuild(vcs, username, project, build, token);
}

export function deleteProjectsCache(branch: string) {
    return invalidateProjectsCache(branch);
}


export function getBuildChartData(vcs: string, username: string, project: string, build: number | string, token: string) {
    return getArtifactsForBuilds([{build_num: build}], vcs, username, project, token)
        .then((builds: BuildInterface[]) => {
            return loadArtifactsContentForBuilds(builds, token);
        })
        .then((data: BuildInterface[]) => {
            return data.shift();
        })
        .then((buildData: BuildInterface) => {
            return groupResultsByReportTag(buildData);
        })
        .then((data: GroupedBuildReports) => {
            return buildChartDataFromTaggedResults(data);
        });
}
