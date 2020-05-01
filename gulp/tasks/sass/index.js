const gulp = require('gulp');
const sass = require('gulp-dart-sass');

gulp.task('sass', function() {
    return gulp.src('./assets/src/scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./assets/dist/css'));
});

gulp.task('sass:watch', function() {
    gulp.watch('./assets/src/**/*.scss', gulp.parallel(['sass']));
});
