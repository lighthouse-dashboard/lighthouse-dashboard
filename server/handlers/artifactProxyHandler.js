const { getArtifact } = require('../utils/utils');

module.exports = async(req) => {
    const { url } = req.query;

    return await getArtifact(url, req.server.app.token);
};
