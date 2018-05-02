import { Request } from "hapi";

import { getArtifactsForBuildNum } from '../../services/artifact'
import { ApplicationState } from "../../interfaces/ApplicationState";
import CircleArtifact from "../../interfaces/Artifact";

export async function getArtifacts (req: Request) {
    const { vcs, username, project, build } = req.params;
    const { token } = <ApplicationState>req.server.app;
    const artifacts = await getArtifactsForBuildNum(parseInt(build), vcs, username, project, token);

    return artifacts.map(({ url, path }: CircleArtifact) => {
        return { url, path };
    });
};
