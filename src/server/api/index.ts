let cachedResponse: ProjectCache = {};
const request = require('request-promise');

import { transformProjects, transformBuilds, transformBuild } from "./helpers";
import { ProjectCache, Project } from "interfaces/Project";
import Build from "../interfaces/Build";
import CircleArtifact from "../interfaces/Artifact";

export async function getProjects(branch: string, token: string): Promise<Project[]> {
    if (cachedResponse[branch] && cachedResponse[branch].length > 0 && process.env.NODE_ENV !== 'test') {
        return cachedResponse[branch];
    }

    const allCircleProjects = await request(`https://circleci.com/api/v1.1/projects?circle-token=${token}`, { json: true });
    const projects = transformProjects(allCircleProjects, branch);
    cachedResponse[branch] = projects;
    return projects;
}

export async function invalidateProjectsCache(branch: string): Promise<any> {
    cachedResponse[branch] = [];
    return Promise.resolve();
}

export async function getBuildsForProject(vcs: string, username: string, project: string, branch: string, token: string, limit: number, filter: string = 'completed'): Promise<Build[]> {
    const builds = await request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/tree/${branch}?circle-token=${token}&limit=${limit}&filter=${filter}`, { json: true });
    return transformBuilds(builds);
}

export async function getArtifactsForBuild(vcs: string, username: string, project: string, buildNum: number, token: string): Promise<CircleArtifact[]> {
    return await request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/${buildNum}/artifacts?circle-token=${token}&filter=completed`, { json: true })
}

export async function getBuild(vcs: string, username: string, project: string, buildNum: number, token: string): Promise<Build> {
    const build = await request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/${buildNum}?circle-token=${token}`, { json: true });
    return transformBuild(build);
}

export async function getArtifactContent<T>(url: string): Promise<T> {
    return await request(url, { json: true });
}
