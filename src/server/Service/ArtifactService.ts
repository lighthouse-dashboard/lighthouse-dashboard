import ApiService from "./ApiService";
import CircleArtifact from "../Interfaces/Artifact";
import {extname} from "path";

export default class ArtifactService {
    apiServie: ApiService;

    constructor(apiService: ApiService) {
        this.apiServie = apiService;
    }

    public async getArtifactsForBuildNum(buildNum: number, vcs: string, username: string, project: string, token: string): Promise<CircleArtifact[]> {
        return await this.apiServie.getArtifactsForBuild(vcs, username, project, buildNum, token);
    }

    public async getArtifactContent<T>(url: string, token: string): Promise<T> {
        return await this.apiServie.getArtifactContent<T>(url + `?circle-token=${token}`);
    }

    public filterArtifactsByType(type: string, artifacts: CircleArtifact[]): CircleArtifact[] {
        return artifacts.filter(item => {
            return extname(item.path) === `.${type}` ? item : null;
        });
    }

}
