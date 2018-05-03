import { Request } from "hapi";

import { getProjects, deleteProjectsCache, getHistoryData } from '../../services/project'
import { ApplicationState } from "../../interfaces/ApplicationState";

export async function getAllProjects(req: Request) {
    const { branch } = req.params;
    const { token } = <ApplicationState>req.server.app;

    return getProjects(branch, token);
};

export async function invalidateCache(req: Request) {
    await deleteProjectsCache(req.params.branch);
    return {};
};
