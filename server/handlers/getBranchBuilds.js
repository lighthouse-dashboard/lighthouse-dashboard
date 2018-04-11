const { getBranchBuilds } = require('../utils');

module.exports = async (req, h) => {
    const { vcs, username, project, branch } = req.params;
    const { token, limit } = req.server.app;

    return await getBranchBuilds(vcs, username, project, branch, token, limit, 'completed');
};
