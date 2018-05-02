import { orderBy } from 'lodash';

import * as api from '../../api';
import { ProjectInterface, ProjectSeriesData } from '../../Interfaces';
import { filterSupportedProjects } from './helper';
import { getBuilds } from '../build';
import { calculateTrendForSeries, setupSeriesData } from './trendUtils';
import { getBuildsDreihouseArtifactData } from '../artifact/dreihouse';

export async function getProjects(branch: string, token: string): Promise<ProjectInterface[]> {
    const projects = await api.getProjects(branch, token);
    const filteredProjects = await filterSupportedProjects(projects, branch, token);
    return orderBy(filteredProjects, ['lastBuild.stop_time'], ['desc'])
}

export async function deleteProjectsCache(branch: string) {
    return await api.invalidateProjectsCache(branch);
}

export async function getTrendData(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<ProjectSeriesData> {
    const builds = await getBuilds(vcs, username, project, branch, token, limit);
    const artifactsDataBuild = await getBuildsDreihouseArtifactData(builds, vcs, username, project, token);
    const seriesData = await setupSeriesData(artifactsDataBuild);
    return calculateTrendForSeries(seriesData);
}

export async function getHistoryData(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<ProjectSeriesData> {
    const builds = await getBuilds(vcs, username, project, branch, token, limit);
    const artifactsDataBuild = await getBuildsDreihouseArtifactData(builds, vcs, username, project, token);
    return setupSeriesData(artifactsDataBuild);
}
