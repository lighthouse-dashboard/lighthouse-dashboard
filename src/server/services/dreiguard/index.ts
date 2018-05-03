import {extname} from "path";

import {filterForImageArtifacts, filterForJsonArtifacts, getArtifactsForBuildNum} from "../artifact/index";
import {getArtifactContent} from "../../api/index";
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


async function getArtifactsData(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
    const jsonArtifacts = filterForJsonArtifacts(artifacts);
    const filteredArtifacts = filterDreiguardArtifacts(jsonArtifacts);

    const artifactsWithContent = filteredArtifacts.map(async (artifact: CircleArtifact) => {
        const content = await getArtifactContent<DreiguardReport[]>(artifact.url + `?circle-token=${token}`);
        artifact.data = content;
        return artifact;
    });

    return await Promise.all(artifactsWithContent);
}

export async function getReportData(build: Build, vcs: string, username: string, project: string, token: string): Promise<Array<DreiguardReport[]>> {
    const artifacts = await getArtifactsData(build, vcs, username, project, token);
    const dreiguardArtifacts = filterDreiguardArtifacts(artifacts);

    const imageArtifacts = filterForImageArtifacts(dreiguardArtifacts);
    const jsonArtifacts = filterForJsonArtifacts(dreiguardArtifacts);

    return jsonArtifacts.map((artifact: CircleArtifact) => {
        return replaceImagePaths(<DreiguardReport[]>artifact.data, imageArtifacts);
    });
}

export async function getDiffData(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<Array<FlattedDreiguardData[]>> {
    const build = await getBuild(vcs, username, project, buildNumber, token);
    const dreiguardData = await getReportData(build, vcs, username, project, token);
    return flattenData(dreiguardData);
}


export async function getScreenshots(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<string[]> {
    const build = await getBuild(vcs, username, project, buildNumber, token);
    const dreiguardData = await getReportData(build, vcs, username, project, token);

    return getComparedImages(dreiguardData);
}

export async function getDiffs(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<string[]> {
    const build = await getBuild(vcs, username, project, buildNumber, token);
    const dreiguardData = await getReportData(build, vcs, username, project, token);
    return getDiffImages(dreiguardData);
}
