import { orderBy } from 'lodash';

import * as api from '../../api';
import { BuildInterface } from 'Interfaces';

import { buildChartDataFromTaggedResults, groupResultsByReportTag } from './helper';
import { loadBuildArtifactData } from '../artifact';

export async function getBuild(vcs: string, username: string, project: string, build: number, token: string): Promise<BuildInterface> {
    return await api.getBuild(vcs, username, project, build, token);
}

export async function getBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<BuildInterface[]> {
    const builds = await api.getBuildsForProject(vcs, username, project, branch, token, limit)
    return orderBy(builds, ['build_num']);
}

export async function getChartData(vcs: string, username: string, project: string, buildNum: number, token: string) {
    const build = await getBuild(vcs, username, project, buildNum, token)
    if (!build) {
        throw new Error('Build not found');
    }

    const buildWithArtifacts =await loadBuildArtifactData(build, vcs, username, project, token);
    const groupedBuildReports = groupResultsByReportTag(buildWithArtifacts);
    return await buildChartDataFromTaggedResults(groupedBuildReports);
}


export async function getLatestBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number, filter: string = 'completed'): Promise<BuildInterface[]> {
    return await api.getBuildsForProject(vcs, username, project, branch, token, limit, filter);
}