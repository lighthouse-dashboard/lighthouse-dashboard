import { Request } from "hapi";
import { ApplicationState, CircleArtifactInterface } from "../Interfaces";

const { getArtifactListForBuild } = require('../utils');

export default async (req: Request) => {
    const { vcs, username, project, build } = req.params;
    const { token } = <ApplicationState>req.server.app;
    const artifacts = await getArtifactListForBuild(vcs, username, project, build, token);

    return artifacts.map(({ url, path }: CircleArtifactInterface) => {
        return { url, path };
    });
};
