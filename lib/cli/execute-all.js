import { getAllSites, setScheduledAuditForSite } from '../core/db/models/sites';
import connectDatabase from '../core/db/connect-database';
import logger from '../core/logger';
import { createNewAuditForConfig } from '../core/utils/create-new-audit';

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
