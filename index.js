import throng from 'throng';
import app from './src/server';

throng({
    workers: process.env.WEB_CONCURRENCY || 1,
    grace: 1000,
    lifetime: Infinity,
    start: () => {
        app();
    },
});
