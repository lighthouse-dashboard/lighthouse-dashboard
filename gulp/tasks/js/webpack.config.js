const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const devConfig = require('./webpack.dev.config.js');
const prodConfig = require('./webpack.prod.config.js');

module.exports = merge(baseConfig, process.env.NODE_ENV === 'development' ? devConfig : prodConfig);
