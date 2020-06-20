import { getAllSites, setScheduledAuditForSite } from '../../src/models/sites';
import connectDatabase from '../../src/db/connect-database';
import logger from '../logger';
import { createNewAuditForConfig } from '../../src/utils/create-new-audit';

/**
 * Execute audit for all pages
 * @param {boolean} useQueue
 * @return {Promise<void>}
 */
export default async function executeAll(useQueue) {
    const uri = process.env.MONGODB_URI;
    logger.debug(`Execute all audits via cli`);
    const { database, client } = await connectDatabase(uri);

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
