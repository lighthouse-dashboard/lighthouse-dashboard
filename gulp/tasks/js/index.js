const gulp = require('gulp');
const webpack= require('webpack');
const webpackConfig = require('../../../build/webpack.config');
const isDist = process.env.NODE_ENV === 'production';
let bundler = exports.bundler = {};

function compileJs(resolve) {
    if (bundler.compiler) {
        return;
    }

    // NOTE: The flag ensures that compiler errors don't get swallowed the first time you run the project
    let hasRunOnce = false;

    bundler.compiler = webpack(webpackConfig);
    bundler.compiler.run((error, stats) => {
        if (!isDist && hasRunOnce) {
            return;
        }
        resolve();
    });
}

gulp.task('js', compileJs);
