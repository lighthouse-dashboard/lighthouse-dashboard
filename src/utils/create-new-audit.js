import curry from 'lodash.curry';
import { saveReport } from '../api/reports/db/reports';
import { updateSite } from '../api/sites/db/sites';
import logger from '../logger';
import lighthouseTransformer from '../transformer/lighthouse-transformer';
import runLighthouse from './run-lighthouse';

/**
 * Create new audit
 * @param {SiteConfig} config
 * @param {ReportMeta} meta
 * @return {Promise<Report>}
 */
export async function createNewAuditForConfig(config, meta = { message: null, git_commit: null }) {
    const { url, device } = config;
    const transformAuditCurry = curry(lighthouseTransformer);
    try {
        const { transformed, raw } = await runLighthouse({ url, runs: 2, device }, transformAuditCurry(config.id));
        await saveReport({ ...transformed, ...meta }, raw);
        await updateSite(config.id, { last_audit: new Date().toISOString() });
        return transformed;
    } catch (e) {
        logger.error(e.message);
    }
    return null;
}
