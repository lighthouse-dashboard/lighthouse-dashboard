import { getSiteConfigById, setScheduledAuditForSite } from '../core/db/models/sites';
import connectDatabase from '../core/db/connect-database';
import logger from '../core/logger';
import { createNewAuditForConfig } from '../core/utils/create-new-audit';

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
        await setScheduledAuditForSite(database, config, true);
    } else {
        await createNewAuditForConfig(database, config, { message: 'CLI - single' });
    }
    await client.close();
}
