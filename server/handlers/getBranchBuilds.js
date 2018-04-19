const { getBranchBuilds } = require('../utils');

module.exports = async(req) => {
    const { vcs, username, project, branch } = req.params;
    const { token, limit } = req.server.app;

    const builds = await getBranchBuilds(vcs, username, project, branch, token, limit, 'completed');

    return builds.map((build) => {
        const { build_num } = build; //eslint-disable-line
        return {
            build_num,
        };
    });
};
