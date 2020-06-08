import { getAllSites, setScheduledAuditForSite } from '../api/sites/db/sites';
import connectDatabase from '../database/connect-database';
import logger from '../logger';
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

    for (let i = 0; i < sites.length; i++) {
        const config = sites[i];
        if (useQueue) {
            await setScheduledAuditForSite(database, config, true);
        } else {
            await createNewAuditForConfig(database, config, { message: 'CLI - all' });
        }
    }
    await client.close();
}
