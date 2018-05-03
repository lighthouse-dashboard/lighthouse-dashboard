import {extname} from "path";

import {getArtifactsForBuildNum} from "../artifact/index";
import {getArtifactContent} from "../../api/index";
import CircleArtifact from "../../interfaces/Artifact";
import Build from "../../interfaces/Build";
import DreiguardReport, {FlattedDreiguardData} from "../../interfaces/DreiguardReport";
import {getBuild} from "../build";
import {
    getComparedImages,
    filterForImageArtifacts,
    flattenDreiguardData,
    replaceImagePaths,
    filterForJsonArtifacts
} from "./helper";

async function getJsonArtifacts(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
    return filterForJsonArtifacts(artifacts);
}

async function getImageArtifacts(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
    return filterForImageArtifacts(artifacts);
}

async function loadArtifactsData(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getJsonArtifacts(build, vcs, username, project, token);
    const artifactsWithContent = artifacts.map(async (artifact: CircleArtifact) => {
        const content = await getArtifactContent<DreiguardReport[]>(artifact.url + `?circle-token=${token}`);
        artifact.data = content;
        return artifact;
    });

    return await Promise.all(artifactsWithContent);
}

export async function getReportData(build: Build, vcs: string, username: string, project: string, token: string): Promise<Array<DreiguardReport[]>> {
    const artifacts = await loadArtifactsData(build, vcs, username, project, token);
    const imageArtifacts = await getImageArtifacts(build, vcs, username, project, token);

    return artifacts.map((artifact: CircleArtifact) => {
        return replaceImagePaths(<DreiguardReport[]>artifact.data, imageArtifacts);
    });
}

export async function getDiffData(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<Array<FlattedDreiguardData[]>> {
    const build = await getBuild(vcs, username, project, buildNumber, token);
    const dreiguardData = await getReportData(build, vcs, username, project, token);
    return flattenDreiguardData(dreiguardData);
}


export async function getScreenshots(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<string[]> {
    const build = await getBuild(vcs, username, project, buildNumber, token);
    const dreiguardData = await getReportData(build, vcs, username, project, token);

    return getComparedImages(dreiguardData);
}
