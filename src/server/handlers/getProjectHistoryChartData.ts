import { Request } from "hapi";
import { ApplicationState } from "../Interfaces";


import { getHistoryData } from '../services/project';

export default async (req: Request) => {
    const { vcs, username, project, branch } = req.params;
    const { limit, token } = <ApplicationState>req.server.app;

    return getHistoryData(vcs, username, project, branch, token, limit);
};
