const get = require('lodash/get');
const compact = require('lodash/compact');
const orderBy = require('lodash/orderBy');
const { extname, basename } = require('path');

import {
    BuildInterface,
    CircleArtifactInterface,
    CircleBuildInterface,
    CircleProjectInterface,
    CircleReportContentInterface,
    ProjectInterface
} from '../Interfaces';

const { getArtifactsForBuild, getArtifactContent } = require('../api');

export async function filterSupportedProjects(projects: ProjectInterface[], branch: string, token: string): Promise<ProjectInterface[]> {
    const p = projects.map(async (project) => {
        const isSupported = await isProjectSupported(project, branch, token);
        if (isSupported) {
            return project;
        }
        return null;
    });

    return Promise.all(p)
        .then((data: Array<ProjectInterface | null>) => {
            return compact(data);
        })
}

export async function isProjectSupported(project: ProjectInterface, branch: string, token: string): Promise<Boolean> {
    const lastSucceededBuild = project.lastBuild;
    return await isBuildSupported(project.vcs, project.username, project.project, lastSucceededBuild.build_num, token)
}


export function sortFilteredProjects(projects: ProjectInterface[]): ProjectInterface[] {
    return projects.sort((projectA: ProjectInterface, projectB: ProjectInterface) => {
        const timeA = new Date(projectA.lastBuild.stop_time);
        const timeB = new Date(projectB.lastBuild.stop_time);
        return timeA <= timeB ? 1 : -1;
    });
}

export async function isBuildSupported(vcs: string, username: string, project: string, build: number | string, token: string): Promise<boolean> {
    const artifacts = await getArtifactsForBuild(vcs, username, project, build, token)
    const jsonArtifacts = await getArtifactsByType('json', artifacts);
    return !(!jsonArtifacts || jsonArtifacts.length <= 0);
}

export function getArtifactsByType(type: string, artifacts: CircleArtifactInterface[]): Promise<CircleArtifactInterface[]> {
    return Promise.resolve(artifacts.filter(item => {
        return extname(item.path) === `.${type}` ? item : null;
    }));
}

export async function getDashboardArtifacts(vcs: string, username: string, project: string, build: number | string, token: string): Promise<CircleArtifactInterface[]> {
    const artifacts = await getArtifactsForBuild(vcs, username, project, build, token)
    const jsonArtifacts = await getArtifactsByType('json', artifacts);
    return jsonArtifacts.filter((item: CircleArtifactInterface) => {
        if (basename(item.path).indexOf('.dashboard.') !== -1) {
            return item;
        }
        return null;
    });
}

export async function getArtifactsForBuilds(builds: BuildInterface[], vcs: string, username: string, project: string, token: string): Promise<BuildInterface[]> {
    const data = builds.map(async (item) => {
        const artifacts = await getDashboardArtifacts(vcs, username, project, item.build_num, token)
        return { build_num: item.build_num, artifacts };
    });

    return Promise.all(data);
}

export function loadArtifactsContentForBuilds(builds: BuildInterface[], token: string): Promise<BuildInterface[]> {
    const p = builds.map(async (item) => {
        const data = await getDashboardContentsByBuild(item.artifacts, token)
        item.artifactContent = data;
        return item;
    });
    return Promise.all(p);
}

export async function getDashboardContentsByBuild(buildArtifacts: CircleArtifactInterface[], token: string): Promise<CircleReportContentInterface[]> {
    return Promise.all(buildArtifacts.map(async (item) => {
        const data = await getArtifactContent(item.url + `?circle-token=${token}`)
        if (!data.key) {
            data.key = `${data.tag}:${data.url}`;
        }
        item.data = data;
        return data;
    }));
}
