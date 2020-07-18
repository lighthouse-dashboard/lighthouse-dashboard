import worker from '../../lib/worker/worker';

require('dotenv').config();

worker({
    mongoUri: process.env.MONGODB_URI,
    maxReportsAge: process.env.MAX_REPORTS_AGE,
    maxRawReports: process.env.MAX_RAW_REPORTS,
}).then(() => {
    process.exit(0);
});
