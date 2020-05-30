const { join } = require('path');

const root = join(__dirname, '../../');
const templates = join(root, 'templates');
const assetDist = join(root, 'assets/dist');
const htmlAsset = join(root, 'assets/src/html');
const jsAsset = join(root, 'assets/src/js/app');

module.exports = {
    root,
    templates,
    assetDist,
    htmlAsset,
    jsAsset,
};
