import { getAllSites } from '../database/sites';
import queue, { closeConnection } from '../queue';
import sendToQueue from '../queue/send-to-queue';
import { createNewAuditForConfig } from '../utils/create-new-audit';

/**
 * Execute audit for all pages
 * @param {boolean} useQueue
 * @return {Promise<void>}
 */
export default async function executeAll(useQueue) {
    const sites = await getAllSites();
    const channel = await queue();

    for (let i = 0; i < sites.length; i++) {
        const config = sites[i];
        if (useQueue) {
            await sendToQueue(channel, config);
        } else {
            await createNewAuditForConfig(config);
        }
    }
    await channel.close();
    await closeConnection();
}
