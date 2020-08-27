import { getScheduledSites, setScheduledAuditForSite } from '../core/services/site-service';
import { createNewAuditForConfig } from '../../src/utils/create-new-audit';
import logger from '../logger';

/**
 * Start worker and connect to mq
 * @return {Promise<void>}
 */
export async function consumeQueue() {
    const sites = await getScheduledSites();
    logger.info(`Found ${ sites.length } scheduled jobs`);

    for (let i = 0; i < sites.length; i++) {
        await executeAudit(sites[i]);
    }
}

/**
 * Callback when a message is received
 * @param {Sites.SiteModel} data;
 * @return {Promise<void>}
 */
async function executeAudit(data) {
    const report = await createNewAuditForConfig(data);
    await setScheduledAuditForSite(data, false);
    if (!report) {
        logger.warn(`No report for ${ data.url }`);
        return;
    }
    logger.debug(`${ data.url } => ${ report.values.map(({ id, value }) => `${ id }=${ value }`).join(',') }`);
}
