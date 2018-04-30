import { Request } from "hapi";
import { ApplicationState } from "../Interfaces";

const { getProjectTrendData } = require('../utils');

export default async (req: Request) => {
    const { vcs, username, project, branch } = req.params;
    const { token } = <ApplicationState>req.server.app;

    return getProjectTrendData(vcs, username, project, branch, token)
};
