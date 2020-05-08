require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

const paths = require('../src/config/path');
const isDist = process.env.NODE_ENV === 'production'

// NOTE: Export webpack config
module.exports = {
    devtool: '#source-map',
    mode: isDist ? 'production' : 'development',
    entry: path.resolve(paths.jsAsset, 'main.js'),
    context: path.resolve(paths.jsAsset),
    //indexPath: path.resolve(paths.templates, 'dist/index.html'),

    output: {
        publicPath: 'js/',
        path: path.resolve(paths.assetDist, 'js'),
        filename: 'entry/[name]/index.js', // NOTE: We don't need a chunkhash as django takes care of entry modules
        chunkFilename: 'chunks/[name]/index.[chunkhash].js',
        devtoolModuleFilenameTemplate: 'source-webpack:///[resourcePath]',
        devtoolFallbackModuleFilenameTemplate: 'source-webpack:///[resourcePath]?[hash]',
    },

    node: {
        process: true,      //   set to true resolved this problem
    },

    module: {
        rules: [
            {
                test: /\.s(c|a)ss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: { esModule: true },
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },

    plugins: [
        new VueLoaderPlugin(),
        new VuetifyLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(paths.templates, 'dist/index.html'),
            template: path.resolve(paths.htmlAsset, 'index.html'),
        }),
        new webpack.EnvironmentPlugin({
            UI_THEME: process.env.UI_THEME,
        }),
    ],

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
        modules: [
            'node_modules',
            path.relative(paths.root, path.resolve(paths.jsAsset)),
        ],
        extensions: ['*', '.js', '.ts', '.tsx', '.vue'],
    },
};