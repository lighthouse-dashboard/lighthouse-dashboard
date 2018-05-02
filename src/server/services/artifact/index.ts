import { extname, basename } from 'path';

import { BuildInterface, CircleArtifactInterface, CircleReportContentInterface } from '../../Interfaces';
import * as api from '../../api';
import { filterDashboardArtifacts } from './helper';

export async function getArtifactsForBuild(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<CircleArtifactInterface[]> {
    return await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
}

export async function getArtifactsForBuildNum(buildNum: number, vcs: string, username: string, project: string, token: string): Promise<CircleArtifactInterface[]> {
    return await api.getArtifactsForBuild(vcs, username, project, buildNum, token);
}

export async function getDashboardArtifacts(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<CircleArtifactInterface[]> {
    let artifacts = await api.getArtifactsForBuild(vcs, username, project, build.build_num, token);
    artifacts = filterDashboardArtifacts(artifacts);
    return artifacts;
}

export async function getArtifactContent(url: string): Promise<CircleReportContentInterface> {
    return await api.getArtifactContent(url);
}