import { extname } from "path";

import { BuildInterface, CircleArtifactInterface } from '../../Interfaces';
import { getArtifactsForBuildNum } from ".";
import { getArtifactContent } from "../../api";
import DreiguardReportInterface from "../../interfaces/DreiguardReportInterface";

async function getArtifactsForBuild(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<CircleArtifactInterface[]> {
    const artifacts = await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
    return artifacts.filter((artifact: CircleArtifactInterface) => {
        return (extname(artifact.path) === '.json' && artifact.path.startsWith('dreiguard'));
    })
}

async function loadArtifactsData(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<CircleArtifactInterface[]> {
    const artifacts = await getArtifactsForBuild(build, vcs, username, project, token);
    const artifactsWithContent = artifacts.map(async (artifact: CircleArtifactInterface) => {
        const content = await getArtifactContent<DreiguardReportInterface[]>(artifact.url + `?circle-token=${token}`);
        artifact.data = content;
        return artifact;
    });

    return await Promise.all(artifactsWithContent);
}

export async function getArtifactData(build: BuildInterface, vcs: string, username: string, project: string, token: string): Promise<Array<DreiguardReportInterface[]>> {
    const artifacts = await loadArtifactsData(build, vcs, username, project, token);
    return artifacts.map((artifact: CircleArtifactInterface) => {
        return artifact.data;
    });
}

export function flattenDreiguardData(data: Array<DreiguardReportInterface[]>) {
    return data.map((reports: DreiguardReportInterface[]) => {
        return reports.map((report: DreiguardReportInterface) => {
            return {
                compareFiles: report.compareFiles,
                diff: report.diff,
                reference: report.capability,
                source: report.diffReport ? report.diffReport.capability : null
            };
        });
    });
}