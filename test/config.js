require('dotenv').config();

module.exports = {
    SERVER: `http://localhost:${process.env.PORT||3000}`,
    API: `https://circleci.com/api/v1.1/`,
    TOKEN: `${process.env.CIRCLE_TOKEN}`,
    SECRET: `${process.env.SECRET}`,
    BRANCH: `master`,
};
