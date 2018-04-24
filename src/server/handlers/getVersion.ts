const { readFileSync } = require('fs');
const { resolve } = require('path');

export default () => {
    const { version } = JSON.parse(readFileSync(resolve(__dirname, '../../../package.json')));
    return { version };
};
