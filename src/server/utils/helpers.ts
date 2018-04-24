const {get, compact, orderBy} = require('lodash');
const {extname, basename} = require('path');

import {
    BuildInterface,
    CircleArtifactInterface,
    CircleBuildInterface,
    CircleProjectInterface, CircleReportContentInterface,
    ProjectInterface
} from '../Interfaces';

const {getArtifactsForBuild, getArtifactContent} = require('./api');

export function filterSupportedProjects(projects: CircleProjectInterface[], branch: string, token: string): Promise<CircleProjectInterface[]> {
    const p = projects.map((project) => {
        if (!get(project, `branches.${ branch }.last_success.build_num`)) {
            return null;
        }

        const lastSucceededBuild = project.branches[branch].last_success;

        return isBuildSupported('github', project.username, project.reponame, lastSucceededBuild.build_num, token)
            .then((isSupported: boolean) => {
                if (!isSupported) {
                    return null;
                }

                return project;
            });
    });

    return Promise.all(p)
        .then((data: Array<CircleProjectInterface | null>) => {
            return compact(data);
        })
}

export function transformProject(project: CircleProjectInterface, branch: string): ProjectInterface {
    return {
        vcs: project.vcs_type,
        username: project.username,
        project: project.reponame,
        lastBuild: project.branches[branch].last_success
    }
}

export function transformProjects(projects: CircleProjectInterface[], branch: string): ProjectInterface[] {
    return projects.map((project:CircleProjectInterface) => {
        return transformProject(project, branch)
    })
}

export function sortFilteredProjects(projects: ProjectInterface[]): ProjectInterface[] {
    return projects.sort((projectA: ProjectInterface, projectB: ProjectInterface) => {
        const timeA = new Date(projectA.lastBuild.stop_time);
        const timeB = new Date(projectB.lastBuild.stop_time);
        return timeA <= timeB ? 1 : -1;
    });
}

export function isBuildSupported(vcs: string, username: string, project: string, build: number | string, token: string): Promise<boolean> {
    return getArtifactsForBuild(vcs, username, project, build, token)
        .then((artifacts: CircleArtifactInterface[]) => {
            return getArtifactsByType('json', artifacts);
        })
        .then((artifacts: CircleArtifactInterface[]) => {
            return !(!artifacts || artifacts.length <= 0);
        });
}

export function getArtifactsByType(type: string, artifacts: CircleArtifactInterface[]): Promise<CircleArtifactInterface[]> {
    return Promise.resolve(artifacts.filter(item => {
        return extname(item.path) === `.${ type }` ? item : null;
    }));
}

export function getDashboardArtifacts(vcs: string, username: string, project: string, build: number | string, token: string): Promise<CircleArtifactInterface[]> {
    return getArtifactsForBuild(vcs, username, project, build, token)
        .then((artifacts: CircleArtifactInterface[]) => {
            return getArtifactsByType('json', artifacts);
        })
        .then((artifacts: CircleArtifactInterface[]) => {
            return artifacts.filter((item: CircleArtifactInterface) => {
                if (basename(item.path).indexOf('.dashboard.') !== -1) {
                    return item;
                }
                return null;
            });
        });
}

export function getArtifactsForBuilds(builds: CircleBuildInterface[], vcs: string, username: string, project: string, token: string): Promise<BuildInterface[]> {
    const data = builds.map((item) => {
        return getDashboardArtifacts(vcs, username, project, item.build_num, token)
            .then((artifacts: CircleArtifactInterface[]) => {
                return {build_num: item.build_num, artifacts};
            });
    });

    return Promise.all(data);
}

export function loadArtifactsContentForBuilds(builds: BuildInterface[], token: string): Promise<BuildInterface[]> {
    const p = builds.map((item) => {
        return getDashboardContentsByBuild(item.artifacts, token)
            .then((data) => {
                item.artifactContent = data;
                return item;
            });
    });
    return Promise.all(p);
}

export function getDashboardContentsByBuild(buildArtifacts: CircleArtifactInterface[], token: string): Promise<CircleReportContentInterface[]> {
    return Promise.all(buildArtifacts.map((item) => {
        return getArtifactContent(item.url + `?circle-token=${ token }`)
            .then((data: any) => {
                if (!data.key) {
                    data.key = `${ data.tag }:${ data.url }`;
                }
                item.data = data;
                return data;
            });
    }));
}
