import {Request} from "hapi";

import {ApplicationState} from "../../interfaces/ApplicationState";
import * as dreihouse from "../../services/dreihouse";
import {getHistoryData} from "../../services/project";

export async function getBuildChartData(req: Request) {
    const {vcs, username, project, build} = req.params;
    const {token} = <ApplicationState>req.server.app;

    return dreihouse.getChartData(vcs, username, project, parseInt(build), token);
};

export async function getHistory (req: Request) {
    const { vcs, username, project, branch } = req.params;
    const { limit, token } = <ApplicationState>req.server.app;

    return getHistoryData(vcs, username, project, branch, token, limit);
};
