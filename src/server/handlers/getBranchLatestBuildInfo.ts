import { ApplicationState, BuildInterface } from "../Interfaces";
import { Request } from "hapi";

const { getLatestBuildsForProject } = require('../utils');

export default async (req: Request) => {
    const { vcs, username, project, branch } = req.params;
    const { token } = <ApplicationState>req.server.app;

    return  await getLatestBuildsForProject(vcs, username, project, branch, token, 1, 'completed');
};
