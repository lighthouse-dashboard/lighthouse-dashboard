import { getScheduledSites, setScheduledAuditForSite } from '../api/sites/db/sites';
import connectDatabase from '../database/connect-database';
import logger from '../logger';
import { createNewAuditForConfig } from '../utils/create-new-audit';

/**
 * Start worker and connect to mq
 * @param {Db} database
 * @return {Promise<void>}
 */
export async function consumeQueue(database) {
    const sites = await getScheduledSites(database);
    logger.info(`Found ${ sites.length } scheduled jobs`);

    for (let i = 0; i < sites.length; i++) {
        await executeAudit(sites[i]);
    }
}

/**
 * Callback when a message is received
 * @param {Sites.SiteConfig} data;
 * @return {Promise<void>}
 */
async function executeAudit(data) {
    const { database } = await connectDatabase();
    const report = await createNewAuditForConfig(database, data);
    await setScheduledAuditForSite(database, data, false);
    if (!report) {
        logger.warn(`No report for ${ data.url }`);
        return;
    }
    logger.debug(`${ data.url } => ${ report.values.map(({ id, value }) => `${ id }=${ value }`).join(',') }`);
}
