import connectDatabase from '../database/connect-database';
import logger from '../logger';

export default async function checkHealth() {
    logger.info('Checking system health');
    try {
        const { client } = await connectDatabase();
        client.close();
        logger.debug('DB connection OK');
    } catch (e) {
        logger.error(e);
        return false;
    }

    return true;
}
