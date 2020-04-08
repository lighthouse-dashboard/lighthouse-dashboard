import curry from 'lodash.curry';
import runLighthouse from '../audit/run-lighthouse';
import { saveReport } from '../database/reports';
import { updateSite } from '../database/sites';
import logger from '../logger';
import lighthouseTransformer from '../transformer/lighthouse-transformer';

/**
 * Create new audit
 * @param {SiteConfig} config
 * @param {ReportMeta} meta
 * @return {Promise<Report>}
 */
export async function createNewAuditForConfig(config, meta = {}) {
    const { url, runs, device } = config;
    const transformAuditCurry = curry(lighthouseTransformer);
    try {
        const { transformed, raw } = await runLighthouse({ url, runs, device }, transformAuditCurry(config.id));
        await saveReport({ ...transformed, ...meta }, raw);
        await updateSite(config.id, { last_audit: new Date().toISOString() });
        return transformed;
    } catch (e) {
        logger.error(e.message);
    }
    return null;
}
