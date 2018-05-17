import {orderBy} from 'lodash';

import Build from "../Interfaces/Build";
import ApiService from "./ApiService";

export default class BuildService {
    apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    public async getLatestBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number, filter: string = 'completed'): Promise<Build[]> {
        return await this.apiService.getBuildsForProject(vcs, username, project, branch, token, limit, filter);
    }

    public async getBuild(vcs: string, username: string, project: string, build: number, token: string): Promise<Build> {
        return await this.apiService.getBuild(vcs, username, project, build, token);
    }

    public async getBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<Build[]> {
        const builds = await this.apiService.getBuildsForProject(vcs, username, project, branch, token, limit)
        return orderBy(builds, ['build_num']);
    }
}
