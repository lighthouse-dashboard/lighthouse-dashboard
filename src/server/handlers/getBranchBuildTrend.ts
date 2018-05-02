import { Request } from "hapi";
import { ApplicationState } from "../Interfaces";

import { getTrendData } from '../services/project';

export default async (req: Request) => {
    const { vcs, username, project, branch } = req.params;
    const { token } = <ApplicationState>req.server.app;

    return await getTrendData(vcs, username, project, branch, token, 10)
};
