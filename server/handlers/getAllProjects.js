const {getAllProjects} = require('../utils');

module.exports = async (req, h) => {
    return await getAllProjects(req.server.app.token, req.params.branch);
};
