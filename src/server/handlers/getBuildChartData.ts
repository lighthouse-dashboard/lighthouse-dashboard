import { Request } from "hapi";
import { ApplicationState } from "../Interfaces";

const { getBuildChartData } = require('../utils');

export default async (req: Request) => {
    const { vcs, username, project, build } = req.params;
    const { token } = <ApplicationState>req.server.app;

    return getBuildChartData(vcs, username, project, build, token);
};
