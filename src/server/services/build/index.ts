import {orderBy} from 'lodash';

import * as api from '../../api';
import Build from '../../interfaces/Build';

export async function getBuild(vcs: string, username: string, project: string, build: number, token: string): Promise<Build> {
    return await api.getBuild(vcs, username, project, build, token);
}

export async function getBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number): Promise<Build[]> {
    const builds = await api.getBuildsForProject(vcs, username, project, branch, token, limit)
    return orderBy(builds, ['build_num']);
}

export async function getLatestBuilds(vcs: string, username: string, project: string, branch: string, token: string, limit: number, filter: string = 'completed'): Promise<Build[]> {
    return await api.getBuildsForProject(vcs, username, project, branch, token, limit, filter);
}
