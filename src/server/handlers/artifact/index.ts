import { Request } from "hapi";
import { ApplicationState, CircleArtifactInterface } from "../../Interfaces";

import { getArtifactsForBuildNum } from '../../services/artifact'

export async function getArtifacts (req: Request) {
    const { vcs, username, project, build } = req.params;
    const { token } = <ApplicationState>req.server.app;
    const artifacts = await getArtifactsForBuildNum(parseInt(build), vcs, username, project, token);

    return artifacts.map(({ url, path }: CircleArtifactInterface) => {
        return { url, path };
    });
};
