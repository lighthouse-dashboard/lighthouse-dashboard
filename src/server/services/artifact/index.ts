import * as api from '../../api';
import Build from '../../interfaces/Build';
import CircleArtifact from '../../interfaces/Artifact';

export async function getArtifactsForBuild(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    return await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
}

export async function getArtifactsForBuildNum(buildNum: number, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    return await api.getArtifactsForBuild(vcs, username, project, buildNum, token);
}

export async function getArtifactContent<T>(url: string, token: string): Promise<T> {
    return await api.getArtifactContent<T>(url + `?circle-token=${token}`);
}
