const { invalidateCache } = require('../utils');

module.exports = async(req) => {
    return await invalidateCache(req.server.app.token, req.params.branch);
};
