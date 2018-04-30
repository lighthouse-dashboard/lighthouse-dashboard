import { CircleProjectInterface, ProjectInterface, CircleBuildInterface, BuildInterface } from '../Interfaces';

export function transformProject(project: CircleProjectInterface, branch: string): ProjectInterface {
    return {
        vcs: project.vcs_type,
        username: project.username,
        project: project.reponame,
        lastBuild: project.branches[branch].last_success
    };
}

export function transformProjects(projects: CircleProjectInterface[], branch: string): ProjectInterface[] {
    return projects.map((project: CircleProjectInterface) => {
        return transformProject(project, branch)
    });
}

export function transformBuilds(builds: CircleBuildInterface[]): BuildInterface[] {
    return builds.map((build: CircleBuildInterface) => {
        return transformBuild(build);
    });
}

export function transformBuild(build: CircleBuildInterface): BuildInterface {
    return {
        build_num: build.build_num,
        artifacts: [],
    };
}