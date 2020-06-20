import curry from 'lodash.curry';
import logger from '../../lib/logger';
import { saveReport } from '../models/reports';
import { updateSite } from '../models/sites';
import lighthouseTransformer from './lighthouse-transformer';
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
        const { transformed, raw } = await runLighthouse({
            config: { url, runs: 2, device },
            transformer: transformAuditCurry(config.id),
            chromePath: process.env.GOOGLE_CHROME_BIN,
            port: process.env.GOOGLE_CHROME_PORT,

        });
        await saveReport(database, { ...transformed, ...meta }, raw);
        await updateSite(database, config.id, { last_audit: new Date().toISOString() });
        return transformed;
    } catch (e) {
        logger.error(e.message);
    }
    return null;
}
