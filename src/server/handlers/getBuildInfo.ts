import {Request} from "hapi";
import {ApplicationState} from "../Interfaces";

import { getBuildByNum } from '../utils';

export default async(req: Request) => {
    const { vcs, username, project, build } = req.params;
    const {token} = <ApplicationState>req.server.app;

    const buildNum = parseInt(build);

    const buildInfo = await getBuildByNum(vcs, username, project, buildNum, token);

    const { build_num, subject, user, build_time_millis, stop_time, status } = buildInfo;
    return { build_num, subject, user, build_time_millis, stop_time, status };
};
