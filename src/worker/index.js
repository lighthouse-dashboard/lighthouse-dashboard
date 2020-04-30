import config from '../../config/server';
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

    if (config.DB.MAX_REPORTS_HISTORY_AGE !== false) {
        await removeOldReports(database);
    }

    if (config.DB.MAX_RAW_DATA_HISTORY !== false) {
        await clearReports(database);
    }

    logger.info(`Start audit worker`);
    await consumeQueue(process.env.MESSAGE_QUEUE_URI, 'audits');
}

boot();
