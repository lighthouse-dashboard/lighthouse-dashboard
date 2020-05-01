const { join } = require('path');

const root = join(__dirname, '../../');
const assets = join(root, 'assets');
const src = join(assets, 'src');
const scss = join(src, 'scss');
const js = join(src, 'js');

module.exports = {
    root,
    assets,
    src,
    scss,
    js,
}
