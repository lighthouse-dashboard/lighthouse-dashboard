const { getProjects } = require('../utils/utils');

module.exports = async(req) => {
    const { branch } = req.params;
    const { token } = req.server.app;

    return getProjects(branch, token)
        .then((projects) => {
            return projects;
        });
};
