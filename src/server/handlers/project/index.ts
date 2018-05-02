import { ApplicationState, ProjectInterface } from "../../Interfaces";
import { Request } from "hapi";

import { getProjects, deleteProjectsCache, getHistoryData } from '../../services/project'

export async function getAllProjects(req: Request) {
    const { branch } = req.params;
    const { token } = <ApplicationState>req.server.app;

    return getProjects(branch, token);
};

export async function invalidateCache(req: Request) {
    await deleteProjectsCache(req.params.branch);
    return {};
};

export async function getHistory (req: Request) {
    const { vcs, username, project, branch } = req.params;
    const { limit, token } = <ApplicationState>req.server.app;

    return getHistoryData(vcs, username, project, branch, token, limit);
};
