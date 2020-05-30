const { spawn } = require('child_process');
const gulp = require('gulp');

gulp.task('dev', function() {
    const dev = spawn('npm', ['run', 'server-dev']);
    const serve = spawn('npm', ['run', 'serve']);
    const gulp = spawn('gulp');


    function setupOutput(proc) {
        proc.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        proc.stderr.on('data', (data) => {
            console.error(data.toString());
        });
    }

    setupOutput(dev);
    setupOutput(serve);
    setupOutput(gulp);

    function cleanup() {
        dev.kill('SIGINT');
        serve.kill('SIGINT');
        gulp.kill('SIGINT');
    }

    process.on('SIGINT', cleanup);
    process.on('exit', cleanup);

});
