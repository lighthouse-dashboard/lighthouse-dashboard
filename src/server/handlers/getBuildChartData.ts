import { Request } from "hapi";
import { ApplicationState } from "../Interfaces";

import { getChartData } from '../services/build'

export default async (req: Request) => {
    const { vcs, username, project, build } = req.params;
    const { token } = <ApplicationState>req.server.app;

    return getChartData(vcs, username, project, parseInt(build), token);
};
