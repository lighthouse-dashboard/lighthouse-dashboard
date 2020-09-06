import logger from '../logger';
import { report } from '../reporter';
import { AUDIT_CHECK, AUDIT_COMPLETE, AUDIT_FAILED } from '../reporter/Events';
import { getScheduledSites, setScheduledAuditForSite } from '../shared/services/site-service';
import { createNewAuditForConfig } from './utils/create-new-audit';

/**
 * Start worker and connect to mq
 * @return {Promise<void>}
 */
export async function consumeQueue() {
    const sites = await getScheduledSites(1000, true);
    logger.info(`Found ${ sites.length } scheduled jobs`);
    await report(AUDIT_CHECK, sites.length);

    for (let i = 0; i < sites.length; i++) {
        await executeAudit(sites[i]);
    }
}

/**
 * Callback when a message is received
 * @param {Sites.SiteModel} site;
 * @return {Promise<void>}
 */
async function executeAudit(site) {
    try {
        const r = await createNewAuditForConfig(site);
        await setScheduledAuditForSite(site, false);
        await report(AUDIT_COMPLETE, site, r.transformed, r.raw);
        if (!r) {
            logger.warn(`No report for ${ site.url }`);
            return;
        }
        logger.debug(`${ site.url } => ${ r.transformed.values.map(({ id, value }) => `${ id }=${ value }`).join(',') }`);
    } catch (e) {
        await report(AUDIT_FAILED, site, e.message);
    }
}
