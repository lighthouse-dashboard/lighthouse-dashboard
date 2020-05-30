const gulp = require('gulp');

gulp.task('build', gulp.series('js', 'sass'));
