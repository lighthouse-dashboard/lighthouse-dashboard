import {uniq} from 'lodash';
import {basename} from "path";

import CircleArtifact from "../interfaces/Artifact";
import DreiguardReport, {FlattedDreiguardData} from "../interfaces/DreiguardReport";

function replaceImage(imagePath: string, images: CircleArtifact[], token: string): string {
    for (let i = 0; i < images.length; i++) {
        const image = images[i];
        if (basename(imagePath) === basename(image.path)) {
            return image.url+`?circle-token=${token}`;
        }
    }
    return imagePath;
}

function replaceImages(files: string[], images: CircleArtifact[], token: string): string[] {
    return files.map((file: string) => {
        return replaceImage(file, images, token);
    });
}

export function getComparedImages(artifacts: Array<DreiguardReport[]>): string[] {
    let images: string[] = [];

    artifacts.forEach((reports: DreiguardReport[]) => {
        reports.forEach((report: DreiguardReport) => {
            images.push(...report.compareFiles);
        });
    });

    return uniq(images);
}

export function getDiffImages(artifacts: Array<DreiguardReport[]>): string[] {
    let images: string[] = [];

    artifacts.forEach((reports: DreiguardReport[]) => {
        reports.forEach((report: DreiguardReport) => {
            if(report.diff.diffFile) {
                images.push(report.diff.diffFile);
            }
        });
    });

    return uniq(images);
}

export function flattenData(data: Array<DreiguardReport[]>): Array<FlattedDreiguardData[]> {
    return data.map((reports: DreiguardReport[]) => {
        return reports.map((report: DreiguardReport) => {
            return {
                whitepageDiff: report.whitepageDiff,
                compareFiles: report.compareFiles,
                diff: report.diff,
                source: report.capability,
                reference: report.diffReport ? report.diffReport.capability : null
            };
        });
    });
}

export function replaceImagePaths(reports: DreiguardReport[], imageArtifacts: CircleArtifact[], token: string): DreiguardReport[] {
    return reports.map((report: DreiguardReport) => {
        report.compareFiles = replaceImages(report.compareFiles, imageArtifacts, token);
        report.diff.diffFile = report.diffFile ? replaceImage(report.diffFile, imageArtifacts, token) : report.diffFile;
        return report;
    })
}

export function filterDreiguardArtifacts(artifacts: CircleArtifact[]): CircleArtifact[] {
     return artifacts.filter((artifact: CircleArtifact) => {
        return (artifact.path.startsWith('dreiguard'));
    })
}
