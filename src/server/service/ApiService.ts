import {Project, ProjectCache} from "../interfaces/Project";
import {transformBuild, transformBuilds, transformProjects} from "../api/helpers";
import Build from "../interfaces/Build";
import CircleArtifact from "../interfaces/Artifact";

const request = require('request-promise');

export default class ApiService {
    cachedProjects: ProjectCache;
    env: string;

    constructor(env: string) {
        this.cachedProjects = {};
        this.env = env;
    }

    async getProject(branch: string, token: string): Promise<Project[]> {
        if (this.cachedProjects[branch] && this.cachedProjects[branch].length > 0 && this.env !== 'test') {
            return this.cachedProjects[branch];
        }

        const allCircleProjects = await request(`https://circleci.com/api/v1.1/projects?circle-token=${token}`, {json: true});
        const projects = transformProjects(allCircleProjects, branch);
        this.cachedProjects[branch] = projects;
        return projects;
    }

    invalidateCache(branch: string): void {
        this.cachedProjects[branch] = [];
    }

    async getBuildsForProject(vcs: string, username: string, project: string, branch: string, token: string, limit: number, filter: string = 'completed'): Promise<Build[]> {
        const builds = await request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/tree/${branch}?circle-token=${token}&limit=${limit}&filter=${filter}`, {json: true});
        return transformBuilds(builds);
    }

    async getArtifactsForBuild(vcs: string, username: string, project: string, buildNum: number, token: string): Promise<CircleArtifact[]> {
        return await request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/${buildNum}/artifacts?circle-token=${token}&filter=completed`, {json: true})
    }

    async getBuild(vcs: string, username: string, project: string, buildNum: number, token: string): Promise<Build> {
        const build = await request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/${buildNum}?circle-token=${token}`, {json: true});
        return transformBuild(build);
    }

    async getArtifactContent<T>(url: string): Promise<T> {
        return await request(url, {json: true});
    }

}
