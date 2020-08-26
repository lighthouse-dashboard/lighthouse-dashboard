import index from '../../lib/cleanup';

require('dotenv').config();

index({
    mongoUri: process.env.MONGODB_URI,
    maxReportsAge: process.env.MAX_REPORTS_AGE,
})
    .then(() => {
        process.exit(0);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
