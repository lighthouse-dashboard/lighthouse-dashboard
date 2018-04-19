const { getArtifacts } = require('../utils');

module.exports = async(req) => {
    const { vcs, username, project, build } = req.params;
    const token = req.server.app.token;
    const artifacts = await getArtifacts(vcs, username, project, build, token);

    return artifacts.map(({ url, path }) => {
        return { url, path };
    });
};
