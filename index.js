import throng from 'throng';
import app from './src/server';
import auditsWorker from './src/workers/audits-worker';

if (process.env.IS_WORKER) {
    auditsWorker();
}

throng({
    workers: process.env.WEB_CONCURRENCY || 1,
    grace: 1000,
    lifetime: Infinity,
    start: () => {
        app();
    },
});
