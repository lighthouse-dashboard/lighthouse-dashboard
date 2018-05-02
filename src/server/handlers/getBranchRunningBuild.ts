import { Request } from "hapi";
import { ApplicationState, BuildInterface } from "../Interfaces";

import { getLatestBuilds } from '../services/build';

export default async (req: Request) => {
    const { vcs, username, project, branch } = req.params;
    const { token } = <ApplicationState>req.server.app;

    return await getLatestBuilds(vcs, username, project, branch, token, 1, 'running');
};
