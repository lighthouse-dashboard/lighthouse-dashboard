
import {filterForImageArtifacts, filterForJsonArtifacts, getArtifactsForBuildNum} from "../artifact/index";
import {getArtifactContent} from "../artifact";
import CircleArtifact from "../../interfaces/Artifact";
import Build from "../../interfaces/Build";
import DreiguardReport, {FlattedDreiguardData} from "../../interfaces/DreiguardReport";
import {getBuild} from "../build";

import {
    getComparedImages,
    flattenData,
    replaceImagePaths,
    getDiffImages,
    filterDreiguardArtifacts
} from "./helper";


async function getDreiguardArtifactsWithData(buildNumber: number, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifactsForBuildNum(buildNumber, vcs, username, project, token);
    const jsonArtifacts = filterForJsonArtifacts(artifacts);
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

    const imageArtifacts = filterForImageArtifacts(dreiguardArtifacts);
    const jsonArtifacts = filterForJsonArtifacts(dreiguardArtifacts);

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
