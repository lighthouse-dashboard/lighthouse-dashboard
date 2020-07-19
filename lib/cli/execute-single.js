import { getSiteConfigById, setScheduledAuditForSite } from '../../src/services/site-service';
import { createNewAuditForConfig } from '../../src/utils/create-new-audit';
import logger from '../logger';

/**
 * Execute a single audit
 * @param {boolean} useQueue
 * @param {string} id
 * @return {Promise<void>}
 */
export default async function executeSingle(useQueue, id) {
    logger.debug(`Execute single audit via cli`);
    const config = await getSiteConfigById(id);
    if (!config) {
        throw new Error(`No config found for id ${ id }`);
    }

    if (useQueue) {
        await setScheduledAuditForSite(config, true);
    } else {
        await createNewAuditForConfig(config, { message: 'CLI - single' });
    }
}
