import {extname, basename} from "path";

import {getArtifactsForBuildNum} from "../index";
import {getArtifactContent} from "../../../api/index";
import CircleArtifact from "../../../interfaces/Artifact";
import Build from "../../../interfaces/Build";
import DreiguardReport, {FlattedDreiguardData} from "../../../interfaces/DreiguardReport";

async function getArtifacts(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
    return artifacts.filter((artifact: CircleArtifact) => {
        return (extname(artifact.path) === '.json' && artifact.path.startsWith('dreiguard'));
    })
}

export async function getImageArtifacts(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifactsForBuildNum(build.build_num, vcs, username, project, token);
    return artifacts.filter((artifact: CircleArtifact) => {
        return (extname(artifact.path) === '.png' && artifact.path.startsWith('dreiguard'));
    })
}

async function loadArtifactsData(build: Build, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
    const artifacts = await getArtifacts(build, vcs, username, project, token);
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

function getImageByBasename(imagePath: string, images: CircleArtifact[]): string {
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (basename(imagePath) === basename(image.path)) {
            return image.url;
        }
    }

    return imagePath;
}

function replaceImages(files: string[], images: CircleArtifact[]): string[] {
    return files.map((file: string) => {
        return getImageByBasename(file, images);
    });
}

export function flattenDreiguardData(data: Array<DreiguardReport[]>): Array<FlattedDreiguardData[]> {
    return data.map((reports: DreiguardReport[]) => {
        return reports.map((report: DreiguardReport) => {
            return {
                compareFiles: report.compareFiles,
                diff: report.diff,
                source: report.capability,
                reference: report.diffReport ? report.diffReport.capability : null
            };
        });
    });
}

export function replaceImagesWithArtifacts(flattedDreiguardData: Array<FlattedDreiguardData[]>, artifactImages: CircleArtifact[]) {
    return flattedDreiguardData.map((data: FlattedDreiguardData[]) => {
        return data.map((entry: FlattedDreiguardData) => {
            entry.diff.diffFile = entry.diff.diffFile ? getImageByBasename(entry.diff.diffFile, artifactImages) : null;
            entry.compareFiles = replaceImages(entry.compareFiles, artifactImages);
            return entry;
        })
    });
}
