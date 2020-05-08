const path = require('path');
const fs = require('fs');
const gulp = require('gulp');
const undertaker = require('undertaker-forward-reference');

gulp.registry(undertaker());

const tasksDir = path.join(__dirname, 'gulp/tasks');
fs.readdirSync(tasksDir).forEach(file => require(path.join(tasksDir, file))); // eslint-disable-line global-require

gulp.task('default', gulp.series('build', gulp.parallel('sass:watch', 'js:watch')));
