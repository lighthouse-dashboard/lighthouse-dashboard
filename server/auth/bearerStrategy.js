
require('dotenv').config();

module.exports = {
    allowQueryToken: true,
    validate: async (request, token, h) => {
        const isValid = token === process.env.SECRET;

        const credentials = { token };
        const artifacts = { };

        return { isValid, credentials, artifacts };
    }
};
