import { getAllSites } from '../api/sites/db/sites';
import logger from '../logger';
import queue, { closeConnection } from '../queue';
import sendToQueue from '../queue/send-to-queue';
import { createNewAuditForConfig } from '../utils/create-new-audit';

/**
 * Execute audit for all pages
 * @param {boolean} useQueue
 * @return {Promise<void>}
 */
export default async function executeAll(useQueue) {
    logger.debug(`Execute all audits via cli`);

    const sites = await getAllSites();
    const channel = await queue();

    for (let i = 0; i < sites.length; i++) {
        const config = sites[i];
        if (useQueue) {
            await sendToQueue(channel, { config, message: 'CLI - all' });
        } else {
            await createNewAuditForConfig(config, { message: 'CLI - all' });
        }
    }
    await channel.close();
    await closeConnection();
}
