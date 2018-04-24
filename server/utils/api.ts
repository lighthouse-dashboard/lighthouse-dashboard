import {CircleArtifactInterface, CircleBuildInterface, CircleProjectInterface} from "../Interfaces";

let cachedResponse: any = {};
const request = require('request-promise');

function getListOfProjects(branch: string, token: string): Promise<CircleProjectInterface> {
    if (cachedResponse[branch] && cachedResponse[branch].length > 0) {
        return Promise.resolve(cachedResponse[branch]);
    }

    return request(`https://circleci.com/api/v1.1/projects?circle-token=${ token }`, {json: true})
        .then((data: object) => {
            cachedResponse[branch] = data;
            return data;
        });
}

function invalidateProjectsCache(branch: string): Promise<any> {
    cachedResponse[branch] = [];
    return Promise.resolve();
}

function getBuildsForProject(vcs: string, username: string, project: string, branch: string, token: string, limit: string, filter: string = 'completed'): Promise<CircleBuildInterface> { //eslint-disable-line
    return request(`https://circleci.com/api/v1.1/project/${ vcs }/${ username }/${ project }/tree/${ branch }?circle-token=${ token }&limit=${ limit }&filter=${ filter }`, {json: true});
}

function getArtifactsForBuild(vcs: string, username: string, project: string, build: number, token: string): Promise<CircleArtifactInterface[]> {
    return request(`https://circleci.com/api/v1.1/project/${ vcs }/${ username }/${ project }/${ build }/artifacts?circle-token=${ token }&filter=completed`, {json: true})
}

function getBuild(vcs: string, username: string, project: string, build: number, token: string): Promise<CircleBuildInterface> {
    return request(`https://circleci.com/api/v1.1/project/${ vcs }/${ username }/${ project }/${ build }?circle-token=${ token }`, {json: true});
}

function getArtifactContent(url: string): Promise<any> {
    return request(url, {json: true});
}

module.exports = {
    getListOfProjects,
    getArtifactsForBuild,
    getBuildsForProject,
    getArtifactContent,
    getBuild,
    invalidateProjectsCache,
};
