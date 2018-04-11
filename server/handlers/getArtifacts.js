const { getArtifacts } = require('../utils');

module.exports = async (req, h) => {
    const { vcs, username, project, build } = req.params;
    const token = req.server.app.token;
    return await getArtifacts(vcs, username, project, build, token);
};
