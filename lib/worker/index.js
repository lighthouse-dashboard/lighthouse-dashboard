import config from '../../config/server';
import { clearReports, removeOldReports } from '../core/db/models/reports';
import { setWorkerIsRunning, setWorkerLastRunDate } from '../core/db/models/system';
import connectDatabase from '../core/db/connect-database';
import logger from '../core/logger';
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
    await consumeQueue(database);
    await setWorkerLastRunDate(database, new Date());
    await setWorkerIsRunning(database, false);
    logger.debug(`Worker complete`);
    await client.close();
}

boot();
