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

import { getListOfProjects, getBuildsForProject, getArtifactContent, getArtifactsForBuild, getBuild, invalidateProjectsCache } from '../api';
import { filterSupportedProjects, getArtifactsForBuilds, loadArtifactsContentForBuilds } from './helpers';
import { calculateTrendForSeries, setupSeriesData } from './trend';
import { buildChartDataFromTaggedResults, groupResultsByReportTag } from './chartDataUtils';

export async function getProjects(branch: string, token: string): Promise<ProjectInterface[]> {
    const projects = await getListOfProjects(branch, token);
    const filteredProjects = await filterSupportedProjects(projects, branch, token);
    return orderBy(filteredProjects, ['lastBuild.pushed_at'], ['desc'])
}

export async function getBuildByNum(vcs: string, username: string, project: string, build: number, token: string): Promise<BuildInterface> {
    return await getBuild(vcs, username, project, build, token);
}

export async function getLatestBuildsForProject(vcs: string, username: string, project: string, branch: string, token: string, limit: number, filter: string = 'completed'): Promise<BuildInterface[]> {
    return await getBuildsForProject(vcs, username, project, branch, token, limit, filter);
}

export async function getBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<BuildInterface[]> {
    const builds = await getBuildsForProject(vcs, username, project, branch, token, limit)
    return orderBy(builds, ['build_num']);
}

export async function getProjectTrendData(vcs: string, username: string, project: string, branch: string, token: string): Promise<ProjectSeriesData> {
    const artifactsDataBuild = await getArtifactBuildData(vcs, username, project, branch, token);
    const seriesData = await setupSeriesData(artifactsDataBuild);
    return calculateTrendForSeries(seriesData);
}

export async function getHistoryData(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<ProjectSeriesData> {
    const artifactsDataBuild = await getArtifactBuildData(vcs, username, project, branch, token);
    return setupSeriesData(artifactsDataBuild);
}

export async function getArtifactBuildData(vcs: string, username: string, project: string, branch: string, token: string): Promise<BuildInterface[]> {
    const builds = await getBuilds(vcs, username, project, branch, token, 10);
    return await loadArtifactDataIntoBuilds(builds, vcs, username, project, token);
}

export async function loadArtifactDataIntoBuilds(builds: BuildInterface[], vcs: string, username: string, project: string, token: string): Promise<BuildInterface[]> {
    const artifactsBuilds = await getArtifactsForBuilds(builds, vcs, username, project, token);
    return await loadArtifactsContentForBuilds(artifactsBuilds, token);
}

export async function getArtifact(url: string): Promise<CircleReportContentInterface> {
    return await getArtifactContent(url);
}

export async function getArtifactListForBuild(vcs: string, username: string, project: string, build: number, token: string): Promise<CircleArtifactInterface[]> {
    return await getArtifactsForBuild(vcs, username, project, build, token);
}

export async function deleteProjectsCache(branch: string) {
    return await invalidateProjectsCache(branch);
}

export async function getBuildChartData(vcs: string, username: string, project: string, build: number, token: string) {
    const builds = await loadArtifactDataIntoBuilds([{ build_num: build, artifacts: [] }], vcs, username, project, token);
    const firstBuild = builds.shift();
    if (!firstBuild) {
        throw new Error('Build not found');
    }
    const groupedBuildReports = groupResultsByReportTag(firstBuild);
    return await buildChartDataFromTaggedResults(groupedBuildReports);
}
