import { Request } from "hapi";
import { ApplicationState, BuildInterface } from "../Interfaces";

const { getLatestBuildsForProject } = require('../utils');

export default async (req: Request) => {
    const { vcs, username, project, branch } = req.params;
    const { token } = <ApplicationState>req.server.app;

    return  await getLatestBuildsForProject(vcs, username, project, branch, token, 1, 'running');
};
