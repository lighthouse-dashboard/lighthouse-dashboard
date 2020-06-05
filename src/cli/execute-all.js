import { getAllSites, setScheduledAuditForSite } from '../api/sites/db/sites';
import connectDatabase from '../database/connect-database';
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
    const { database, client } = await connectDatabase();

    const sites = await getAllSites(database);
    const channel = await queue();

    for (let i = 0; i < sites.length; i++) {
        const config = sites[i];
        if (useQueue) {
            await sendToQueue(channel, { config, message: 'CLI - all' });
            await setScheduledAuditForSite(database, config, 1);
        } else {
            await createNewAuditForConfig(database, config, { message: 'CLI - all' });
        }
    }
    await channel.close();
    await client.close();
    await closeConnection();
}
