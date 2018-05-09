import {orderBy, map, compact} from 'lodash';

import ApiService from "./ApiService";
import {Project} from "../interfaces/Project";
import {ProjectSeriesData} from "../interfaces/ProjectSeriesData";
import {calculateTrendForSeries, setupSeriesData} from "../utils/trend";
import DreihouseService from "./DreihouseService";
import BuildService from "./BuildService";
import ArtifactService from "./ArtifactService";

export default class ProjectService {
    apiService: ApiService;
    dreihouseService: DreihouseService;
    buildService: BuildService;
    artifactService: ArtifactService;

    constructor(apiService: ApiService,
                dreihouseService: DreihouseService,
                buildService: BuildService,
                artifactService: ArtifactService) {
        this.apiService = apiService;
        this.dreihouseService = dreihouseService;
        this.buildService = buildService;
        this.artifactService = artifactService;
    }


    private async filterSupportedProjects(projects: Project[], branch: string, token: string): Promise<Project[]> {
        const filteredProjectsPromises = map(projects, (async (project: Project) => {
            if(!project.lastBuild){
                return null;
            }

            const artifacts = await this.artifactService.getArtifactsForBuildNum(project.lastBuild.build_num, project.vcs, project.username, project.project, token);
            const jsonArtifacts = this.artifactService.filterArtifactsByType('json', artifacts);
            const dreihouseArtifacts = this.dreihouseService.filterArtifacts(jsonArtifacts);
            if (dreihouseArtifacts.length > 0) {
                return project;
            }
            return null
        }));

        const filteredProjects = await Promise.all(filteredProjectsPromises);
        return compact(filteredProjects);
    }

    public async getAll(branch: string, token: string): Promise<Project[]> {
        const projects = await this.apiService.getProject(branch, token);
        const filteredProjects = await this.filterSupportedProjects(projects, branch, token);
        return orderBy(filteredProjects, ['lastBuild.stop_time'], ['desc'])
    }

    public invalidateProjectsCache(branch: string): void {
        this.apiService.invalidateCache(branch);
    }

    public async getTrendData(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<ProjectSeriesData> {
        const builds = await this.buildService.getBuilds(vcs, username, project, branch, token, limit);
        const artifactsDataBuild = await this.dreihouseService.getBuildsArtifactData(builds, vcs, username, project, token);
        const seriesData = await setupSeriesData(artifactsDataBuild);
        return calculateTrendForSeries(seriesData);
    }

    public async getHistoryData(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<ProjectSeriesData> {
        const builds = await this.buildService.getBuilds(vcs, username, project, branch, token, limit);
        const artifactsDataBuild = await this.dreihouseService.getBuildsArtifactData(builds, vcs, username, project, token);
        return setupSeriesData(artifactsDataBuild);
    }
}
