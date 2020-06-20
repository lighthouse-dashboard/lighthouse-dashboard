import { getSiteConfigById, setScheduledAuditForSite } from '../../src/services/models/sites';
import connectDatabase from '../../src/db/connect-database';
import logger from '../logger';
import { createNewAuditForConfig } from '../../src/utils/create-new-audit';

/**
 * Execute a single audit
 * @param {boolean} useQueue
 * @param {string} token
 * @return {Promise<void>}
 */
export default async function executeSingle(useQueue, token) {
    const uri = process.env.MONGODB_URI;
    logger.debug(`Execute single audit via cli`);
    const { database, client } = await connectDatabase(uri);
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
