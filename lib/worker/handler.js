import { getScheduledSites, setScheduledAuditForSite } from '../../src/models/sites';
import connectDatabase from '../../src/db/connect-database';
import logger from '../logger';
import { createNewAuditForConfig } from '../../src/utils/create-new-audit';

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
    const uri = process.env.MONGODB_URI;
    const { database } = await connectDatabase(uri);
    const report = await createNewAuditForConfig(database, data);
    await setScheduledAuditForSite(database, data, false);
    if (!report) {
        logger.warn(`No report for ${ data.url }`);
        return;
    }
    logger.debug(`${ data.url } => ${ report.values.map(({ id, value }) => `${ id }=${ value }`).join(',') }`);
}
