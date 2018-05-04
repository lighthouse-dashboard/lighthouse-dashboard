import {FlattedDreiguardData} from "../interfaces/DreiguardReport";
import DreiguardReport from "../interfaces/DreiguardReport";
import CircleArtifact from "../interfaces/Artifact";

import {filterArtifactsByType} from "../utils/artifacts";
import {
    filterDreiguardArtifacts,
    flattenData,
    getComparedImages, getDiffImages,
    replaceImagePaths
} from "../utils/dreiguard";
import ArtifactService from "./ArtifactService";

export default class DreiguardService {
    artifactService: ArtifactService;

    constructor(artifactService: ArtifactService) {
        this.artifactService = artifactService;
    }

    private async getArtifactsWithData(buildNumber: number, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
        const artifacts = await this.artifactService.getArtifactsForBuildNum(buildNumber, vcs, username, project, token);
        const jsonArtifacts = filterArtifactsByType('json', artifacts);
        const filteredArtifacts = filterDreiguardArtifacts(jsonArtifacts);

        const artifactsWithContent = filteredArtifacts.map(async (artifact: CircleArtifact) => {
            artifact.data = await this.artifactService.getArtifactContent<DreiguardReport[]>(artifact.url, token);
            return artifact;
        });

        return await Promise.all(artifactsWithContent);
    }

    private async getReportData(buildNumber: number, vcs: string, username: string, project: string, token: string): Promise<Array<DreiguardReport[]>> {
        const artifacts = await this.getArtifactsWithData(buildNumber, vcs, username, project, token);
        const dreiguardArtifacts = filterDreiguardArtifacts(artifacts);

        const imageArtifacts = filterArtifactsByType('png', dreiguardArtifacts);
        const jsonArtifacts = filterArtifactsByType('json', dreiguardArtifacts);

        return jsonArtifacts.map((artifact: CircleArtifact) => {
            return replaceImagePaths(<DreiguardReport[]>artifact.data, imageArtifacts);
        });
    }


    public async getDiffData(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<Array<FlattedDreiguardData[]>> {
        const dreiguardData = await this.getReportData(buildNumber, vcs, username, project, token);
        return flattenData(dreiguardData);
    }

    public async getScreenshots(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<string[]> {
        const dreiguardData = await this.getReportData(buildNumber, vcs, username, project, token);
        return getComparedImages(dreiguardData);
    }

    public async getDiffs(vcs: string, username: string, project: string, buildNumber: number, token: string): Promise<string[]> {
        const dreiguardData = await this.getReportData(buildNumber, vcs, username, project, token);
        return getDiffImages(dreiguardData);
    }

}
