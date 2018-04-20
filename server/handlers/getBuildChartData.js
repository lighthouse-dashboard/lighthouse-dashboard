const { getBuildChartData } = require('../utils/utils');

module.exports = async(req) => {
    const { vcs, username, project, build } = req.params;
    const { token } = req.server.app;

    return getBuildChartData(vcs, username, project, build, token);
};
