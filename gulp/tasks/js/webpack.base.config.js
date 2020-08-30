const { matchNodeModules } = require('./utils');
const MinifyJsPlugin = require('terser-webpack-plugin');

require('dotenv').config();

const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('../../../src/config/path');
const config = require('./config');
const isDist = process.env.NODE_ENV === 'production';

// NOTE: Export webpack config
module.exports = {
    devtool: '#source-map',
    mode: isDist ? 'production' : 'development',
    entry: path.resolve(paths.jsAsset, 'main.js'),
    context: path.resolve(paths.jsAsset),
    //indexPath: path.resolve(paths.templates, 'dist/index.html'),

    stats: 'detailed',
    output: {
        publicPath: '/js/',
        path: path.resolve(paths.assetDist, 'js'),
        filename: 'entry/[name]/index.js', // NOTE: We don't need a chunkhash as django takes care of entry modules
        chunkFilename: 'chunks/[name]/index.[chunkhash].js',
        devtoolModuleFilenameTemplate: 'source-webpack:///[resourcePath]',
        devtoolFallbackModuleFilenameTemplate: 'source-webpack:///[resourcePath]?[hash]',
    },

    module: {
        rules: [
            {
                test: /\.story\.js?$/,
                loaders: [
                    {
                        loader: require.resolve('@storybook/source-loader'),
                        options: { parser: 'javascript' },
                    },
                ],
                enforce: 'pre',
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'html-loader'
                    },
                    {
                        loader: 'markdown-loader',
                        options: {
                            /* your options here */
                        },
                    },
                ],
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    esModule: true,

                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            ['@vue/babel-preset-jsx', {
                                injectH: false,
                            }],
                        ],
                        cacheDirectory: true,
                    },
                },
            },
        ],
    },

    plugins: [
        new VueLoaderPlugin({
            cacheDirectory: true,
        }),
        //  new VuetifyLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(paths.templates, 'dist/index.html'),
            template: path.resolve(paths.htmlAsset, 'index.html'),
        }),
    ],

    optimization: {
        minimize: isDist,
        minimizer: isDist ? [new MinifyJsPlugin(config.minify)] : [],
        noEmitOnErrors: !isDist,
        runtimeChunk: true,

        splitChunks: {
            cacheGroups: {
                framework: {
                    test: matchNodeModules(['vue', 'vue-router', 'vuex']),
                    name: 'framework',
                    chunks: 'all',
                },
            },
        },
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
        modules: [
            'node_modules',
            path.relative(paths.root, path.resolve(paths.jsAsset)),
        ],
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.vue'],
    },
};
