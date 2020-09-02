import { getScheduledSites, setScheduledAuditForSite } from '../core/services/site-service';
import logger from '../logger';
import { report } from '../reporter';
import { AUDIT_CHECK } from '../reporter/Events';
import { createNewAuditForConfig } from './utils/create-new-audit';

/**
 * Start worker and connect to mq
 * @return {Promise<void>}
 */
export async function consumeQueue() {
    const sites = await getScheduledSites(1000, true);
    logger.info(`Found ${ sites.length } scheduled jobs`);
    report(AUDIT_CHECK, sites.length);

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
    const r = await createNewAuditForConfig(data);
    await setScheduledAuditForSite(data, false);
    if (!r) {
        logger.warn(`No report for ${ data.url }`);
        return;
    }
    logger.debug(`${ data.url } => ${ r.values.map(({ id, value }) => `${ id }=${ value }`).join(',') }`);
}
