import {getArtifactContent, getArtifactsForBuildNum} from "../artifact";
import CircleArtifact from "../../interfaces/Artifact";
import DreiguardReport, {FlattedDreiguardData} from "../../interfaces/DreiguardReport";

import {
    getComparedImages,
    flattenData,
    replaceImagePaths,
    getDiffImages,
    filterDreiguardArtifacts
} from "./helper";

import {filterArtifactsByType} from "../artifact/helper";

async function getDreiguardArtifactsWithData(buildNumber: number, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifactsForBuildNum(buildNumber, vcs, username, project, token);
    const jsonArtifacts = filterArtifactsByType('json', artifacts);
    const filteredArtifacts = filterDreiguardArtifacts(jsonArtifacts);

    const artifactsWithContent = filteredArtifacts.map(async (artifact: CircleArtifact) => {
        artifact.data = await getArtifactContent<DreiguardReport[]>(artifact.url, token);
        return artifact;
    });

    return await Promise.all(artifactsWithContent);
}

async function getReportData(buildNumber: number, vcs: string, username: string, project: string, token: string): Promise<Array<DreiguardReport[]>> {
    const artifacts = await getDreiguardArtifactsWithData(buildNumber, vcs, username, project, token);
    const dreiguardArtifacts = filterDreiguardArtifacts(artifacts);

    const imageArtifacts = filterArtifactsByType('png', dreiguardArtifacts);
    const jsonArtifacts = filterArtifactsByType('json', dreiguardArtifacts);

    return jsonArtifacts.map((artifact: CircleArtifact) => {
        return replaceImagePaths(<DreiguardReport[]>artifact.data, imageArtifacts);
    });
}

export async function getDiffData(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<Array<FlattedDreiguardData[]>> {
    const dreiguardData = await getReportData(buildNumber, vcs, username, project, token);
    return flattenData(dreiguardData);
}

export async function getScreenshots(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<string[]> {
    const dreiguardData = await getReportData(buildNumber, vcs, username, project, token);
    return getComparedImages(dreiguardData);
}

export async function getDiffs(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<string[]> {
    const dreiguardData = await getReportData(buildNumber, vcs, username, project, token);
    return getDiffImages(dreiguardData);
}
