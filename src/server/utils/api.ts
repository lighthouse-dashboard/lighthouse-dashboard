import {CircleProject, Project} from '../Interfaces/Project';
import Build from '../Interfaces/Build';
import {CircleBuild} from '../Interfaces/CircleBuild';
import {MinimalCircleBuildInfo} from '../Interfaces/MinimalCircleBuildInfo';

export function transformProject(project: CircleProject, branch: string): Project {
    const _project: Project = {
        vcs: project.vcs_type,
        username: project.username,
        project: project.reponame,
        lastBuild: null,
    };

    if (project.branches[branch] && project.branches[branch].last_success) {
        _project.lastBuild = transformMinimalBuild(project.branches[branch].last_success);
    }

    return _project;
}

export function transformProjects(projects: CircleProject[], branch: string): Project[] {
    return projects.map((project: CircleProject) => {
        return transformProject(project, branch);
    });
}

export function transformBuilds(builds: CircleBuild[]): Build[] {
    return builds.map((build: CircleBuild) => {
        return transformBuild(build);
    });
}

export function transformMinimalBuild(build: MinimalCircleBuildInfo): Build {
    return {
        build_num: build.build_num,
        stop_time: new Date(build.added_at),
        status: build.status,
        subject: null,
        user: null,
        build_time_millis: null,
        artifacts: [],
    };
}

export function transformBuild(build: CircleBuild): Build {
    return {
        build_num: build.build_num,
        subject: build.subject,
        user: build.user,
        build_time_millis: build.build_time_milis,
        stop_time: new Date(build.stop_time),
        status: build.status,
        artifacts: [],
    };
}
