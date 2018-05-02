import { extname } from "path";

import { BuildInterface, CircleArtifactInterface, CircleReportContentInterface } from '../../Interfaces';
import { getArtifactsForBuildNum } from ".";
import { getArtifactContent } from "../../api";

async function getDreihouseArtifactsForBuild(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<CircleArtifactInterface[]> {
    const artifacts = await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
    return artifacts.filter((artifact: CircleArtifactInterface) => {
        return (extname(artifact.path) === '.json' && artifact.path.indexOf('.dashboard.') !== -1);
    })
}

async function getDreihouseArtifactsData(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<CircleArtifactInterface[]> {
    const artifacts = await getDreihouseArtifactsForBuild(build, vcs, username, project, token);
    const artifactsWithContent = artifacts.map(async (artifact: CircleArtifactInterface) => {
        const content = await getArtifactContent<CircleReportContentInterface>(artifact.url + `?circle-token=${token}`);
        if (!content.key) {
            content.key = content.tag + ':' + content.url;
        }
        artifact.data = content;
        return artifact;
    });

    return await Promise.all(artifactsWithContent);
}

export async function getDreihouseArtifactData(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<BuildInterface> {
    const dashboardArtifacts = await getDreihouseArtifactsData(build, vcs, username, project, token);
    build.artifacts = dashboardArtifacts;
    return build;
}

export async function getBuildsDreihouseArtifactData(builds: BuildInterface[], vcs: string, username: string, project: string, token: string): Promise<BuildInterface[]> {
    const buildsWithArtifacts = builds.map(async (build: BuildInterface) => {
        return await getDreihouseArtifactData(build, vcs, username, project, token);
    });
    return await Promise.all(buildsWithArtifacts);
}