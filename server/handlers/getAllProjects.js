const { getAllProjects, sortProjectByLatestBuild } = require('../utils');

module.exports = async(req) => {
    const { branch } = req.params;
    const { token } = req.server.app;

    return await getAllProjects(token, branch)
        .then((projects) => {
            return sortProjectByLatestBuild(projects, branch, token);
        });
};
