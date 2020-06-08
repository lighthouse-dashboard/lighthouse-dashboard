import connectDatabase from '../database/connect-database';
import logger from '../logger';

async function checkDatabase() {
    logger.debug('Checking DB connection');
    try {
        await connectDatabase();
        logger.info('DB connection OK');
    } catch (e) {
        logger.error(e);
        throw e;
    }
    return true;
}

export default async function checkHealth() {
    logger.info('Checking system health');
    const dbOk = await checkDatabase();

    if (dbOk) {
        logger.info('Health ok');
    }

    return dbOk;
}
