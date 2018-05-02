import { extname, basename } from 'path';

import { BuildInterface, CircleArtifactInterface, CircleReportContentInterface } from '../../Interfaces';
import * as api from '../../api';
import { filterDashboardArtifacts } from './helper';

export async function getArtifactsForBuild(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<CircleArtifactInterface[]> {
    return await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
}

export async function getDreihouseArtifactsForBuild(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<CircleArtifactInterface[]> {
    const artifacts = await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
    return artifacts.filter((artifact: CircleArtifactInterface) => {
        return (extname(artifact.path) === '.json' && artifact.path.indexOf('.dashboard.') !== -1);
    })
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

export async function getDashboardArtifactsData(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<CircleArtifactInterface[]> {
    const artifacts = await getDreihouseArtifactsForBuild(build, vcs, username, project, token);
    const artifactsWithContent = artifacts.map(async (artifact: CircleArtifactInterface) => {
        const content = await getArtifactContent(artifact.url + `?circle-token=${token}`);
        if (!content.key) {
            content.key = content.tag +':'+ content.url;
        }
        artifact.data = content;
        return artifact;
    });

    return await Promise.all(artifactsWithContent);
}

export async function loadBuildArtifactData(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<BuildInterface> {
    const dashboardArtifacts = await getDashboardArtifactsData(build, vcs, username, project, token);
    build.artifacts = dashboardArtifacts;
    return build;
}

export async function loadBuildsArtifactData(builds: BuildInterface[], vcs: string, username: string, project: string, token: string): Promise<BuildInterface[]> {
    const buildsWithArtifacts = builds.map(async (build: BuildInterface) => {
        return await loadBuildArtifactData(build, vcs, username, project, token);
    });
    return await Promise.all(buildsWithArtifacts);
}