import { getSiteConfigById } from '../api/sites/db/sites';
import connectDatabase from '../database/connect-database';
import logger from '../logger';
import queue, { closeConnection } from '../queue';
import sendToQueue from '../queue/send-to-queue';
import { createNewAuditForConfig } from '../utils/create-new-audit';

/**
 * Execute a single audit
 * @param {boolean} useQueue
 * @param {string} token
 * @return {Promise<void>}
 */
export default async function executeSingle(useQueue, token) {
    logger.debug(`Execute single audit via cli`);
    const { database, client } = await connectDatabase();
    const config = await getSiteConfigById(database, token);
    if (!config) {
        throw new Error(`No config found for ${ token }`);
    }

    if (useQueue) {
        const channel = await queue();
        await sendToQueue(channel, config, 'CLI - single');
    } else {
        await createNewAuditForConfig(database, config, { message: 'CLI - single' });
    }
    await closeConnection();
    await client.close();
    await closeConnection();
}
