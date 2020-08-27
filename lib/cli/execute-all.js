import { getAllSites, setScheduledAuditForSite } from '../core/services/site-service';
import { createNewAuditForConfig } from '../../src/utils/create-new-audit';
import logger from '../logger';

/**
 * Execute audit for all pages
 * @param {boolean} useQueue
 * @return {Promise<void>}
 */
export default async function executeAll(useQueue) {
    logger.debug(`Execute all audits via cli`);
    const sites = await getAllSites();

    for (let i = 0; i < sites.length; i++) {
        const config = sites[i];
        if (useQueue) {
            await setScheduledAuditForSite(config, true);
        } else {
            await createNewAuditForConfig(config, { message: 'CLI - all' });
        }
    }
}
