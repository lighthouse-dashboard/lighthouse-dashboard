const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const sassGlob = require('gulp-sass-globi');
const paths = require('../../config/paths');
const jsonImporter = require('node-sass-json-importer');

gulp.task('sass', function() {
    return gulp.src([
        'assets/src/scss/app.scss',
        'assets/src/scss/theme/*.scss',
    ], { cwd: paths.root })
        .pipe(sassGlob({ includePaths: [paths.src] }))
        .pipe(sass({
            importer: [jsonImporter()],
            includePaths: [
                paths.src,
            ],
        }).on('error', sass.logError))
        .pipe(gulp.dest('./assets/dist/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./assets/src/**/*.scss', gulp.parallel(['sass']));
});
