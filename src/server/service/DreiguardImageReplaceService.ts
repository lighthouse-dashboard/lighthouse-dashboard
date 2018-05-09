import {basename} from "path";
import RunReport from "@dreipol/dreiguard/bin/RunReport";
import CircleArtifact from "../interfaces/Artifact";

export default class DreiguardImageReplaceService {

    public replaceImage(imagePath: string, images: CircleArtifact[], token: string): string {
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            if (basename(imagePath) === basename(image.path)) {
                if (process.env.NODE_ENV === 'production') {
                    return image.url + `?circle-token=${token}`;
                }
                return image.url;
            }
        }
        return imagePath;
    }

    public replaceImages(files: string[], images: CircleArtifact[], token: string): string[] {
        return files.map((file: string) => {
            return this.replaceImage(file, images, token);
        });
    }

    public replaceImagePaths(reports: RunReport[], imageArtifacts: CircleArtifact[], token: string): RunReport[] {
        return reports.map((report: RunReport) => {
            report.compareFiles = this.replaceImages(report.compareFiles, imageArtifacts, token);
            if (report.diff) {
                report.diff.diffFile = report.diffFile ? this.replaceImage(report.diffFile, imageArtifacts, token) : report.diffFile;
            }
            return report;
        })
    }
}
