const { getProjectHistoryChartData } = require('../utils');

module.exports = async(req) => {
    const { vcs, username, project, branch } = req.params;
    const { limit, token } = req.server.app;

    return getProjectHistoryChartData(vcs, username, project, branch, token, limit);
};
