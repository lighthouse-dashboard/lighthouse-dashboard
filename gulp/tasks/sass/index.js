const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const sassGlob = require('gulp-sass-globi');
const paths = require('../../config/paths');

gulp.task('sass', function() {
    return gulp.src('src/scss/main.scss', { cwd: paths.assets })
        .pipe(sassGlob({ includePaths: [paths.js] }))
        .pipe(sass({
            includePaths: [
                paths.js,
            ],
        }).on('error', sass.logError))
        .pipe(gulp.dest('./assets/dist/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./assets/src/**/*.scss', gulp.parallel(['sass']));
});
