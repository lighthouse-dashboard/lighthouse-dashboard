const { getBranchBuilds } = require('../utils');

module.exports = async (req, h) => {
    const { vcs, username, project, branch } = req.params;
    const { token, limit } = req.server.app;

    const builds = await getBranchBuilds(vcs, username, project, branch, token, limit, 'completed');

    return builds.map((build) => {
        const { build_num } = build;

        return {
            build_num
        };
    })
};
