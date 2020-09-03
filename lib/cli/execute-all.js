import { getAllSites, setScheduledAuditForSite } from '../core/services/site-service';
import logger from '../logger';

/**
 * Execute audit for all pages
 * @return {Promise<void>}
 */
export default async function executeAll() {
    logger.debug(`Execute all audits via cli`);
    const sites = await getAllSites(1000, true);

    for (let i = 0; i < sites.length; i++) {
        const config = sites[i];
        await setScheduledAuditForSite(config, true);
    }
    logger.info(`Scheduled ${sites.length} sites`);
}
