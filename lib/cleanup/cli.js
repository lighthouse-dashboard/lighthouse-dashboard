import index from './index';
import './reporters/index';

index({
    maxReportsAge: process.env.MAX_REPORTS_AGE,
})
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
