const { resolve } = require('path');

module.exports = {
    outputDir: './assets',
    indexPath: './templates/index.html',
    publicPath: '',
    configureWebpack: {
        entry: './src/app/main.js',
    },
    chainWebpack: (config) => {
        config
            .plugin('html')
            .tap(args => {
                args[0].template = resolve(__dirname, './templates/index.html')
                return args;
            });
    },
    devServer: {
        proxy: 'http://localhost:4000',
    },
};
