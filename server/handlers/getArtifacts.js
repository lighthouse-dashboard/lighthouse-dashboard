const { getArtifactListForBuild } = require('../utils/utils');

module.exports = async(req) => {
    const { vcs, username, project, build } = req.params;
    const token = req.server.app.token;
    const artifacts = await getArtifactListForBuild(vcs, username, project, build, token);

    return artifacts.map(({ url, path }) => {
        return { url, path };
    });
};
