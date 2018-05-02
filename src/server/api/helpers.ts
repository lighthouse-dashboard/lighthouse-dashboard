import { CircleProject, Project } from "../interfaces/Project";
import Build from "../interfaces/Build";
import { CircleBuild } from "../interfaces/CircleBuild";

export function transformProject(project: CircleProject, branch: string): Project {
    return {
        vcs: project.vcs_type,
        username: project.username,
        project: project.reponame,
        lastBuild: transformBuild(project.branches[branch].last_success)
    };
}

export function transformProjects(projects: CircleProject[], branch: string): Project[] {
    return projects.map((project: CircleProject) => {
        return transformProject(project, branch)
    });
}

export function transformBuilds(builds: CircleBuild[]): Build[] {
    return builds.map((build: CircleBuild) => {
        return transformBuild(build);
    });
}

export function transformBuild(build: CircleBuild): Build {
    return {
        build_num: build.build_num,
        subject: build.subject,
        user: build.user,
        build_time_millis: build.build_time_milis,
        stop_time: build.stop_time,
        status: build.status,
        artifacts: [],
    };
}