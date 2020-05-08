const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const devvConfig = require('./webpack.dev.config.js');

module.exports = merge(baseConfig, devvConfig);
