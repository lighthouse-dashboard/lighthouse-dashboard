const Bcrypt = require('bcrypt');
require('dotenv').config();

const users = {
    dreipol: {
        username: 'dreipol',
        password: process.env.BASIC_PASS,
    }
};

module.exports = {
    validate: async (request, username, password, h) => {
        return {isValid: true, credentials: {name: 'dev'}};

        const user = users[username];
        if (!user) {
            return { credentials: null, isValid: false };
        }

        const isValid = await Bcrypt.compare(password, user.password);
        const credentials = { name: user.username };

        return { isValid, credentials };
    }
};
