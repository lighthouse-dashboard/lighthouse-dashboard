import { getSiteConfigById, setScheduledAuditForSite } from '../../src/models/sites';
import connectDatabase from '../../src/db/connect-database';
import logger from '../logger';
import { createNewAuditForConfig } from '../../src/utils/create-new-audit';

/**
 * Execute a single audit
 * @param {boolean} useQueue
 * @param {string} id
 * @return {Promise<void>}
 */
export default async function executeSingle(useQueue, id) {
    const uri = process.env.MONGODB_URI;
    logger.debug(`Execute single audit via cli`);
    const { database, client } = await connectDatabase(uri);
    const config = await getSiteConfigById(id);
    if (!config) {
        throw new Error(`No config found for id ${ id }`);
    }

    if (useQueue) {
        await setScheduledAuditForSite(database, config, true);
    } else {
        await createNewAuditForConfig(database, config, { message: 'CLI - single' });
    }
    await client.close();
}
