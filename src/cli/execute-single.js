import { getSiteConfigByToken } from '../database/sites';
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
    const config = await getSiteConfigByToken(token);
    if (!config) {
        throw new Error(`No config found for ${ token }`);
    }
    if (useQueue) {
        const channel = await queue();
        await sendToQueue(channel, config);
    } else {
        await createNewAuditForConfig(config);
    }
}
