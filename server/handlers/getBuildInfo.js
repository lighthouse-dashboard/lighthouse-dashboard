const { getBuildByNum } = require('../utils/utils');

module.exports = async(req) => {
    const { vcs, username, project, build } = req.params;
    const token = req.server.app.token;

    const { build_num, subject, user, build_time_millis, stop_time, status } = await getBuildByNum(vcs, username, project, build, token); //eslint-disable-line
    return { build_num, subject, user, build_time_millis, stop_time, status };
};
