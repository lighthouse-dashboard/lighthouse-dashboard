const gulp = require('gulp');
const log = require('fancy-log');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const compiler = webpack(webpackConfig);

function compileJs(resolve) {
    compiler.run(() => {
        resolve();
    })
}

gulp.task('js', compileJs);

gulp.task('js:watch', function() {
    compiler.watch({
        // Example watchOptions
        aggregateTimeout: 300,
    }, (err, stats) => { // Stats Object
        if (stats.compilation.errors) {
            stats.compilation.errors.forEach((e) => {
                console.error(e.stack);
            });
        }

        if (stats.compilation.warnings) {
            stats.compilation.warnings.forEach((e) => {
                console.warn(e.stack);
            });
        }
        if (err) {
            console.error(err);
        }
        log(`Recompile complete ${ (stats.endTime - stats.startTime) / 1000 }s`);
    });
});
