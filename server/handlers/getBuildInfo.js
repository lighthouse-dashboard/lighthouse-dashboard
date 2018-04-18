const { getBuild } = require('../utils');

module.exports = async (req, h) => {
    const { vcs, username, project, build } = req.params;
    const token = req.server.app.token;

    const { build_num, subject, user, build_time_millis, stop_time, status } = await getBuild(vcs, username, project, build, token);
    return { build_num, subject, user, build_time_millis, stop_time, status };
};
