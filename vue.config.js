require('dotenv').config();
const { templates } = require('./src/config/path');
const { assetDist, htmlAsset, jsAsset } = require('./src/config/path');

const { resolve } = require('path');

module.exports = {
    outputDir: assetDist,
    indexPath: resolve(templates, 'dist/index.html'),
    publicPath: '/',
    productionSourceMap: false,
    configureWebpack: {
        entry: resolve(jsAsset, 'main.js'),
        devtool: 'eval-source-map',
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
        proxy: 'http://0.0.0.0:4000',
    },
};
