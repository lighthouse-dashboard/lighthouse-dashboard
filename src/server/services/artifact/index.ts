import {extname} from "path";

import * as api from '../../api';
import { filterDashboardArtifacts } from './helper';
import Build from '../../interfaces/Build';
import CircleArtifact from '../../interfaces/Artifact';
import { CircleReportContent } from '../../interfaces/CircleReportContent';

export function filterForImageArtifacts(artifacts: CircleArtifact[]): CircleArtifact[] {
    return artifacts.filter((artifact: CircleArtifact) => {
        return (extname(artifact.path) === '.png');
    })
}

export function filterForJsonArtifacts(artifacts: CircleArtifact[]): CircleArtifact[] {
    return artifacts.filter((artifact: CircleArtifact) => {
        return (extname(artifact.path) === '.json');
    })
}
export async function getArtifactsForBuild(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    return await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
}

export async function getArtifactsForBuildNum(buildNum: number, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    return await api.getArtifactsForBuild(vcs, username, project, buildNum, token);
}

export async function getDashboardArtifacts(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    let artifacts = await api.getArtifactsForBuild(vcs, username, project, build.build_num, token);
    artifacts = filterDashboardArtifacts(artifacts);
    return artifacts;
}

export async function getArtifactContent(url: string): Promise<CircleReportContent> {
    return await api.getArtifactContent<CircleReportContent>(url);
}
