const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new CompressionPlugin(),
        ],
    },
};
