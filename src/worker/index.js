import { clearReports, removeOldReports } from '../api/reports/db/reports';
import connectDatabase from '../database/connect-database';
import logger from '../logger';
import { consumeQueue } from './handler';

require('dotenv').config();

/**
 * Start app with auto restart functionality
 * @return {Promise<void>}
 */
async function boot() {
    const { database } = await connectDatabase();
    await removeOldReports(database);
    await clearReports(database);

    logger.info(`Start audit worker`);
    await consumeQueue(process.env.MESSAGE_QUEUE_URI, 'audits');
}

boot();
