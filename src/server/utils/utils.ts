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

const orderBy = require('lodash/orderBy');

const { getListOfProjects, getBuildsForProject, getArtifactContent, getArtifactsForBuild, getBuild, invalidateProjectsCache } = require('./api');
const { filterSupportedProjects, getArtifactsForBuilds, loadArtifactsContentForBuilds, transformProjects, transformBuild, transformBuilds} = require('./helpers');
const { calculateTrendForSeries, setupSeriesData } = require('./trendUtils');
const { buildChartDataFromTaggedResults, groupResultsByReportTag } = require('./chartDataUtils');

export async function getProjects(branch: string, token: string): Promise<ProjectInterface[]> {
    const projects = await getListOfProjects(branch, token);
    const filteredProjects = await filterSupportedProjects(projects, branch, token);
    const transformedProjects = await transformProjects(filteredProjects, branch)
    return orderBy(transformedProjects, ['lastBuild.pushed_at'], ['desc'])
}

export async function getBuildByNum(vcs: string, username: string, project: string, build: number | string, token: string): Promise<CircleBuildInterface> {
    return await getBuild(vcs, username, project, build, token);
}

export async function getLatestBuildsForProject(vcs: string, username: string, project: string, branch: string, token: string, limit: number, filter: string = 'completed'): Promise<BuildInterface[]> {
    const builds = await getBuildsForProject(vcs, username, project, branch, token, limit, filter);
    return transformBuilds(builds);
}

export async function getBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<CircleBuildInterface[]> {
    const builds = await getBuildsForProject(vcs, username, project, branch, token, limit)
    return orderBy(builds, ['build_num']);
}

export async function getProjectTrendData(vcs: string, username: string, project: string, branch: string, token: string): Promise<ProjectSeriesData> {
    const artifactsDataBuild = await getArtifactBuildData(vcs, username, project, branch, token);
    const seriesData = await setupSeriesData(artifactsDataBuild);
    return calculateTrendForSeries(seriesData);
}

export async function getHistoryData(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<ProjectArtifactTagData> {
    const artifactsDataBuild = await getArtifactBuildData(vcs, username, project, branch, token);
    return setupSeriesData(artifactsDataBuild);
}

export async function getArtifactBuildData(vcs: string, username: string, project: string, branch: string, token: string) {
    const builds = await getBuilds(vcs, username, project, branch, token, 10);
    return await loadArtifactDataIntoBuilds(transformBuilds(builds), vcs, username, project, token);
}

export async function loadArtifactDataIntoBuilds(builds: BuildInterface[], vcs: string, username: string, project: string, token: string) {
    const artifactsBuilds = await getArtifactsForBuilds(builds, vcs, username, project, token);
    return await loadArtifactsContentForBuilds(artifactsBuilds, token);
}

export async function getArtifact(url: string, token: string): Promise<CircleReportContentInterface> {
    return await getArtifactContent(url, token);
}

export async function getArtifactListForBuild(vcs: string, username: string, project: string, build: number | string, token: string): Promise<CircleArtifactInterface[]> {
    return await getArtifactsForBuild(vcs, username, project, build, token);
}

export async function deleteProjectsCache(branch: string) {
    return await invalidateProjectsCache(branch);
}

export async function getBuildChartData(vcs: string, username: string, project: string, build: number, token: string) {
    const builds = await loadArtifactDataIntoBuilds([{ build_num: build, artifacts: [] }], vcs, username, project, token);
    const firstBuild = builds.shift();
    const groupedBuildReports = groupResultsByReportTag(firstBuild);
    return await buildChartDataFromTaggedResults(groupedBuildReports);
}
