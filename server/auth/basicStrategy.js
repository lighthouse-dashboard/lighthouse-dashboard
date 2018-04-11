const md5 = require('md5');

require('dotenv').config();

const users = {
    dreipol: {
        username: 'dreipol',
        password: process.env.BASIC_PASS,
    }
};

module.exports = {
    validate: async (request, username, password, h) => {
        const user = users[username];
        if (!user) {
            return { credentials: null, isValid: false };
        }

        const isValid = md5(password) === user.password;
        const credentials = { name: user.username };

        return { isValid, credentials };
    }
};
