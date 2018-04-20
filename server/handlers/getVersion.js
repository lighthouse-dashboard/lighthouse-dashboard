const { readFileSync } = require('fs');
const { resolve } = require('path');

module.exports = () => {
    const { version } = JSON.parse(readFileSync(resolve(__dirname, '../../package.json')));
    return { version };
};
