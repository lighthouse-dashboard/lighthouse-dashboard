import {uniq} from 'lodash';
import {basename} from "path";

import CircleArtifact from "../interfaces/Artifact";
import DreiguardReport, {FlattedDreiguardData} from "../interfaces/DreiguardReport";

function replaceImage(imagePath: string, images: CircleArtifact[]): string {
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
        return replaceImage(file, images);
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
                compareFiles: report.compareFiles,
                diff: report.diff,
                source: report.capability,
                reference: report.diffReport ? report.diffReport.capability : null
            };
        });
    });
}

export function replaceImagePaths(reports: DreiguardReport[], imageArtifacts: CircleArtifact[]): DreiguardReport[] {
    return reports.map((report: DreiguardReport) => {
        report.compareFiles = replaceImages(report.compareFiles, imageArtifacts);
        report.diff.diffFile = report.diff.diffFile ? replaceImage(report.diff.diffFile, imageArtifacts) : null;
        return report;
    })
}

export function filterDreiguardArtifacts(artifacts: CircleArtifact[]): CircleArtifact[] {
     return artifacts.filter((artifact: CircleArtifact) => {
        return (artifact.path.startsWith('dreiguard'));
    })
}
