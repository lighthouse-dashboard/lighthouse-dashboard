const {getArtifactContent} = require('../utils');

module.exports = async (req, h) => {
    const { url } = req.query;
    return await getArtifactContent(url, req.server.app.token)
};
