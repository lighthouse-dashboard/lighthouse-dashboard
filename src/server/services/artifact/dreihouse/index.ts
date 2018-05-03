import { extname } from "path";

import { getArtifactsForBuildNum } from "../index";
import { getArtifactContent } from "../../../api/index";
import Build from "../../../interfaces/Build";
import CircleArtifact from "../../../interfaces/Artifact";
import { CircleReportContent } from "../../../interfaces/CircleReportContent";

async function getDreihouseArtifactsForBuild(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
    return artifacts.filter((artifact: CircleArtifact) => {
        return (extname(artifact.path) === '.json' && artifact.path.indexOf('.dashboard.') !== -1);
    })
}

async function getDreihouseArtifactsData(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getDreihouseArtifactsForBuild(build, vcs, username, project, token);
    const artifactsWithContent = artifacts.map(async (artifact: CircleArtifact) => {
        const content = await getArtifactContent<CircleReportContent>(artifact.url + `?circle-token=${token}`);
        if (!content.key) {
            content.key = content.tag + ':' + content.url;
        }
        artifact.data = content;
        return artifact;
    });

    return await Promise.all(artifactsWithContent);
}

export async function getDreihouseArtifactData(build: Build, vcs: string, username: string, project: string, token: string): Promise<Build> {
    const dashboardArtifacts = await getDreihouseArtifactsData(build, vcs, username, project, token);
    build.artifacts = dashboardArtifacts;
    return build;
}

export async function getBuildsDreihouseArtifactData(builds: Build[], vcs: string, username: string, project: string, token: string): Promise<Build[]> {
    const buildsWithArtifacts = builds.map(async (build: Build) => {
        return await getDreihouseArtifactData(build, vcs, username, project, token);
    });
    return await Promise.all(buildsWithArtifacts);
}
