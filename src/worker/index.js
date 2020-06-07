import config from '../../config/server';
import { clearReports, removeOldReports } from '../api/reports/db/reports';
import { setWorkerIsRunning, setWorkerLastRunDate } from '../api/system/db/system';
import connectDatabase from '../database/connect-database';
import logger from '../logger';
import { consumeQueue } from './handler';

require('dotenv').config();

/**
 * Start app with auto restart functionality
 * @return {Promise<void>}
 */
async function boot() {
    const { database, client } = await connectDatabase();
    await setWorkerIsRunning(database, true);

    if (config.db.maxReportsAge !== false) {
        await removeOldReports(database);
    }

    if (config.db.maxRawReports !== false) {
        await clearReports(database);
    }

    logger.info(`Start audit worker`);
    await consumeQueue(process.env.MESSAGE_QUEUE_URI, 'audits');
    await setWorkerLastRunDate(database, new Date());
    await setWorkerIsRunning(database, false);
    logger.debug(`Worker complete`);
    client.close();
}

boot();
