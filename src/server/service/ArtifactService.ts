import ApiService from "./ApiService";
import CircleArtifact from "../interfaces/Artifact";

export default class ArtifactService {
    apiServie: ApiService;

    constructor(apiService: ApiService) {
        this.apiServie = apiService;
    }

    async getArtifactsForBuildNum(buildNum: number, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
        return await this.apiServie.getArtifactsForBuild(vcs, username, project, buildNum, token);
    }

    async getArtifactContent<T>(url: string, token: string): Promise<T> {
        return await this.apiServie.getArtifactContent<T>(url + `?circle-token=${token}`);
    }
}
