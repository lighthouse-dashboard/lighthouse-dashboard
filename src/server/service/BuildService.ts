import Build from "../interfaces/Build";
import ApiService from "./ApiService";
import * as api from "../api";

export default class BuildService {
    apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async getLatestBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number, filter: string = 'completed'): Promise<Build[]> {
        return await this.apiService.getBuildsForProject(vcs, username, project, branch, token, limit, filter);
    }

    async getBuild(vcs: string, username: string, project: string, build: number, token: string): Promise<Build> {
        return await this.apiService.getBuild(vcs, username, project, build, token);
    }

}
