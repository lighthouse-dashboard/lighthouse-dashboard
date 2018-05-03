import { orderBy } from 'lodash';

import * as api from '../../api';

import { buildChartDataFromTaggedResults, groupResultsByReportTag } from './helper';
import { getDreihouseArtifactData } from '../artifact/dreihouse/index';
import * as dreiguard from '../artifact/dreiguard/index';
import { flattenDreiguardData } from '../artifact/dreiguard/index';
import Build from '../../interfaces/Build';

export async function getBuild(vcs: string, username: string, project: string, build: number, token: string): Promise<Build> {
    return await api.getBuild(vcs, username, project, build, token);
}

export async function getBuilds(vcs: string, username: string, project: string
                                , branch: string, token: string, limit: number): Promise<Build[]> {
    const builds = await api.getBuildsForProject(vcs, username, project, branch, token, limit)
    return orderBy(builds, ['build_num']);
}

export async function getChartData(vcs: string, username: string, project: string, buildNum: number, token: string) {
    const build = await getBuild(vcs, username, project, buildNum, token)
    if (!build) {
        throw new Error('Build not found');
    }

    const buildWithArtifacts = await getDreihouseArtifactData(build, vcs, username, project, token);
    const groupedBuildReports = groupResultsByReportTag(buildWithArtifacts);
    return await buildChartDataFromTaggedResults(groupedBuildReports);
}

export async function getLatestBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number, filter: string = 'completed'): Promise<Build[]> {
    return await api.getBuildsForProject(vcs, username, project, branch, token, limit, filter);
}

export async function getDreiguardData(vcs: string, username: string, project: string, buildNumber: number, token: string) {
    const build = await getBuild(vcs, username, project, buildNumber, token);
    const dreiguardData = await dreiguard.getArtifactData(build, vcs, username, project, token);
    const images = await dreiguard.getImageArtifacts(build, vcs, username, project, token);
    const flattedData = flattenDreiguardData(dreiguardData);
    return dreiguard.replaceImagesWithArtifacts(flattedData, images);
}
