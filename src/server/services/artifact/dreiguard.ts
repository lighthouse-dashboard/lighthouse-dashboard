import { extname } from "path";

import { getArtifactsForBuildNum } from ".";
import { getArtifactContent } from "../../api";
import CircleArtifact from "../../interfaces/Artifact";
import Build from "../../interfaces/Build";
import DreiguardReport from "../../interfaces/DreiguardReport";

async function getArtifactsForBuild(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
    return artifacts.filter((artifact: CircleArtifact) => {
        return (extname(artifact.path) === '.json' && artifact.path.startsWith('dreiguard'));
    })
}

async function loadArtifactsData(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifactsForBuild(build, vcs, username, project, token);
    const artifactsWithContent = artifacts.map(async (artifact: CircleArtifact) => {
        const content = await getArtifactContent<DreiguardReport[]>(artifact.url + `?circle-token=${token}`);
        artifact.data = content;
        return artifact;
    });

    return await Promise.all(artifactsWithContent);
}

export async function getArtifactData(build: Build, vcs: string, username: string, project: string, token: string): Promise<Array<DreiguardReport[]>> {
    const artifacts = await loadArtifactsData(build, vcs, username, project, token);
    return artifacts.map((artifact: CircleArtifact) => {
        return artifact.data;
    });
}

export function flattenDreiguardData(data: Array<DreiguardReport[]>) {
    return data.map((reports: DreiguardReport[]) => {
        return reports.map((report: DreiguardReport) => {
            return {
                compareFiles: report.compareFiles,
                diff: report.diff,
                reference: report.capability,
                source: report.diffReport ? report.diffReport.capability : null
            };
        });
    });
}