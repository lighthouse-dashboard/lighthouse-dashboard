import { getSiteConfigByToken } from '../api/sites/db/sites';
import logger from '../logger';
import queue from '../queue';
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
    const config = await getSiteConfigByToken(token);
    if (!config) {
        throw new Error(`No config found for ${ token }`);
    }

    if (useQueue) {
        const channel = await queue();
        await sendToQueue(channel, { config, message: 'CLI - single' });
    } else {
        await createNewAuditForConfig(config, { message: 'CLI - single' });
    }
}
