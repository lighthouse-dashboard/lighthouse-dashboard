import curry from 'lodash/curry';
import { saveReport } from '../db/models/reports';
import { updateSite } from '../db/models/sites';
import logger from '../logger';
import lighthouseTransformer from '../../../src/transformer/lighthouse-transformer';
import runLighthouse from './run-lighthouse';

/**
 * Create new audit
 * @param {Db} database
 * @param {Sites.SiteConfig} config
 * @param {ReportMeta | {}} meta
 * @return {Promise<Reports.Report>}
 */
export async function createNewAuditForConfig(database, config, meta = {}) {
    const { url, device } = config;
    const transformAuditCurry = curry(lighthouseTransformer);
    try {
        const { transformed, raw } = await runLighthouse({ url, runs: 2, device }, transformAuditCurry(config.id));
        await saveReport(database, { ...transformed, ...meta }, raw);
        await updateSite(database, config.id, { last_audit: new Date().toISOString() });
        return transformed;
    } catch (e) {
        logger.error(e.message);
    }
    return null;
}
