import {Request} from "hapi";
import {ApplicationState} from "../Interfaces";

import { getBuild } from '../services/build';

export default async(req: Request) => {
    const { vcs, username, project, build } = req.params;
    const {token} = <ApplicationState>req.server.app;

    const buildNum = parseInt(build);

    const buildInfo = await getBuild(vcs, username, project, buildNum, token);

    const { build_num, subject, user, build_time_millis, stop_time, status } = buildInfo;
    return { build_num, subject, user, build_time_millis, stop_time, status };
};
