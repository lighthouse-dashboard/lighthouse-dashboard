const { getProjectTrends } = require('../utils');

module.exports = async(req) => {
    const { vcs, username, project, branch } = req.params;
    const { category } = req.query;
    const { token } = req.server.app;

    return getProjectTrends(vcs, username, project, branch, token, 2)
        .then((trend) => {
            if (!category) {
                return trend;
            }

            let res = {};
            res[category] = trend[category];
            return res;
        });
};
