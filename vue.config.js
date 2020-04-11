const { templates } = require('./src/config/path');
const { assetDist, htmlAsset, jsAsset } = require('./src/config/path');

const { resolve } = require('path');

module.exports = {
    outputDir: assetDist,
    indexPath: resolve(templates, 'index.html'),
    publicPath: '/',
    configureWebpack: {
        entry: resolve(jsAsset, 'main.js'),
    },
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap(args => {
                args[0].template = resolve(htmlAsset, 'index.html');
                return args;
            });
    },
    devServer: {
        proxy: 'http://0.0.0.0:5000',
    },
};
