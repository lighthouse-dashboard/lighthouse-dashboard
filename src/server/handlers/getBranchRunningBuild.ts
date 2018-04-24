import {Request} from "hapi";
import {ApplicationState, BuildInterface} from "../Interfaces";

const { getLatestBuildsForProject } = require('../utils/utils');

export default async(req: Request) => {
    const { vcs, username, project, branch } = req.params;
    const { token } = <ApplicationState>req.server.app;

    const builds = await getLatestBuildsForProject(vcs, username, project, branch, token, 1, 'running');

    return builds.map((build: BuildInterface) => {
        const { build_num } = build; //eslint-disable-line
        return {
            build_num,
        };
    });
};
