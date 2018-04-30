import {
    CircleArtifactInterface,
    CircleBuildInterface,
    CircleProjectCacheInterface,
    CircleProjectInterface,
    CircleReportContentInterface
} from "../Interfaces";

let cachedResponse: CircleProjectCacheInterface = {};
const request = require('request-promise');

export async function getListOfProjects(branch: string, token: string): Promise<CircleProjectInterface[]> {
    if (cachedResponse[branch] && cachedResponse[branch].length > 0) {
        return cachedResponse[branch];
    }

    const data = await request(`https://circleci.com/api/v1.1/projects?circle-token=${token}`, { json: true });
    cachedResponse[branch] = data;
    return data;
}

export async function invalidateProjectsCache(branch: string): Promise<any> {
    cachedResponse[branch] = [];
    return Promise.resolve();
}

export async function getBuildsForProject(vcs: string, username: string, project: string, branch: string, token: string, limit: string, filter: string = 'completed'): Promise<CircleBuildInterface> { //eslint-disable-line
    return await request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/tree/${branch}?circle-token=${token}&limit=${limit}&filter=${filter}`, { json: true });
}

export async function getArtifactsForBuild(vcs: string, username: string, project: string, build: number, token: string): Promise<CircleArtifactInterface[]> {
    return await request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/${build}/artifacts?circle-token=${token}&filter=completed`, { json: true })
}

export async function getBuild(vcs: string, username: string, project: string, build: number, token: string): Promise<CircleBuildInterface> {
    return await request(`https://circleci.com/api/v1.1/project/${vcs}/${username}/${project}/${build}?circle-token=${token}`, { json: true });
}

export async function getArtifactContent(url: string): Promise<CircleReportContentInterface> {
    return await request(url, { json: true });
}
