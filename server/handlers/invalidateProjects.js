const {invalidateCache} = require('../utils');

module.exports = async (req, h) => {
    return await invalidateCache(req.server.app.token, req.params.branch);
};
