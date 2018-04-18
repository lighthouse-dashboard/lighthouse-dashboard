const { getBranchBuilds } = require('../utils');

module.exports = async (req, h) => {
    const { vcs, username, project, branch } = req.params;
    const { token } = req.server.app;

    const builds = await getBranchBuilds(vcs, username, project, branch, token, 1, 'completed');

    return builds.map((build) => {
        const { build_num } = build;

        return {
            build_num
        };
    })
};
