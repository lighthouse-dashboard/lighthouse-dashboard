const { deleteProjectsCache } = require('../utils/utils');

module.exports = async(req) => {
    return await deleteProjectsCache(req.params.branch);
};
