import {Request} from "hapi";
import {ApplicationState} from "../Interfaces";

const { getBuildByNum } = require('../utils/utils');

export default async(req: Request) => {
    const { vcs, username, project, build } = req.params;
    const {token} = <ApplicationState>req.server.app;

    const { build_num, subject, user, build_time_millis, stop_time, status } = await getBuildByNum(vcs, username, project, build, token); //eslint-disable-line
    return { build_num, subject, user, build_time_millis, stop_time, status };
};
