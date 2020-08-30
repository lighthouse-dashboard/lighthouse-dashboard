const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const devConfig = require('./webpack.dev.config.js');
const prodConfig = require('./webpack.prod.config.js');
const isDev = process.env.NODE_ENV === 'development';


module.exports = merge(baseConfig, isDev ? devConfig : prodConfig);
