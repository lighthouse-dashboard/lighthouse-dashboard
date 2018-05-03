import {orderBy} from 'lodash';

import ApiService from "./ApiService";
import {filterSupportedProjects} from "../services/project/helper";
import {Project} from "../interfaces/Project";
import {ProjectSeriesData} from "../interfaces/ProjectSeriesData";
import {calculateTrendForSeries, setupSeriesData} from "../services/project/trendUtils";
import {getBuilds} from "../services/build";
import {getBuildsDreihouseArtifactData} from "../services/dreihouse";

export default class ProjectService {
    apiService: ApiService;

    constructor(apiService: ApiService) {
        this.apiService = apiService;
    }

    async getAll(branch: string, token: string): Promise<Project[]> {
        const projects = await this.apiService.getProject(branch, token);
        const filteredProjects = await filterSupportedProjects(projects, branch, token);
        return orderBy(filteredProjects, ['lastBuild.stop_time'], ['desc'])
    }

    invalidateProjectsCache(branch: string): void {
        return this.apiService.invalidateCache(branch);
    }

    async getTrendData(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<ProjectSeriesData> {
        const builds = await getBuilds(vcs, username, project, branch, token, limit);
        const artifactsDataBuild = await getBuildsDreihouseArtifactData(builds, vcs, username, project, token);
        const seriesData = await setupSeriesData(artifactsDataBuild);
        return calculateTrendForSeries(seriesData);
    }

    async getHistoryData(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<ProjectSeriesData> {
        const builds = await getBuilds(vcs, username, project, branch, token, limit);
        const artifactsDataBuild = await getBuildsDreihouseArtifactData(builds, vcs, username, project, token);
        return setupSeriesData(artifactsDataBuild);
    }
}
