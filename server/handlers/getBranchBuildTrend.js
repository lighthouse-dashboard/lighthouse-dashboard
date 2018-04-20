const { getProjectTrendData } = require('../utils/utils');

module.exports = async(req) => {
    const { vcs, username, project, branch } = req.params;
    const { category } = req.query;
    const { token } = req.server.app;

    return getProjectTrendData(vcs, username, project, branch, token)
        .then((trend) => {
            if (!category) {
                return trend;
            }

            let res = {};
            res[category] = trend[category];
            return res;
        });
};
