import connectDatabase from '../database/connect-database';
import logger from '../logger';
import { connectMq } from '../queue';

async function checkDatabase() {
    logger.debug('Checking DB connection');
    try {
        await connectDatabase();
        logger.info('DB connection OK');
        return true;
    } catch (e) {
        logger.error(e);
        return false;
    }
}

async function checkMessageQueue() {
    logger.debug('Check MQ connection');
    try {
        await connectMq(process.env.MESSAGE_QUEUE_URI);
        logger.info('MQ connection OK');
        return true;
    } catch (e) {
        logger.error(e);
        return false;
    }
}

export default async function checkHealth() {
    logger.info('Checking system health');
    const dbOk = await checkDatabase();
    const mqOk = await checkMessageQueue();
    const isOk = dbOk && mqOk;

    if (isOk) {
        logger.info('Health ok');
    }

    return isOk;
}
