const { getHistoryData } = require('../utils/utils');

module.exports = async(req) => {
    const { vcs, username, project, branch } = req.params;
    const { limit, token } = req.server.app;

    return getHistoryData(vcs, username, project, branch, token, limit);
};
