const md5 = require('md5');
const boom = require('boom');

module.exports = async(req) => {
    const { password } = req.payload;
    if (md5(password) === process.env.BASIC_PASS) {
        return { token: process.env.SECRET };
    }

    return boom.forbidden();
};
