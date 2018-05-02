import Build from "./Build";

export interface Project {
    username: string;
    project: string;
    lastBuild: Build;
    vcs: string;
}

export interface ProjectCache {
    [key: string]: Project[];
}

export interface CircleProject {
    username: string;
    reponame: string;
    branches: any;
    vcs_type: string;
}