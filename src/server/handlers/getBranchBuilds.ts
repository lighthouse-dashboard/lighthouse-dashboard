import { Request } from "hapi";
import { ApplicationState, BuildInterface } from "../Interfaces";

import { getLatestBuilds } from '../services/build'

export default async (req: Request) => {
    const { vcs, username, project, branch } = req.params;
    const { token, limit } = <ApplicationState>req.server.app;

    const builds = await getLatestBuilds(vcs, username, project, branch, token, limit, 'completed');

    return builds.map((build: BuildInterface) => {
        const { build_num } = build; //eslint-disable-line
        return {
            build_num,
        };
    });
};
