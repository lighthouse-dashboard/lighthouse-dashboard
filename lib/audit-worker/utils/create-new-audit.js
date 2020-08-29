import curry from 'lodash.curry';
import { saveReport } from '../../core/services/report-service';
import { updateSite } from '../../core/services/site-service';
import logger from '../../logger';
import reporter from '../../reporter';
import { AUDIT_COMPLETE, AUDIT_FAILED } from '../../reporter/Events';
import lighthouseTransformer from './lighthouse-transformer';
import runLighthouse from './run-lighthouse';

/**
 * Create new audit
 * @param {Sites.SiteModel} config
 * @param {Reports.ReportMeta | {}} meta
 * @return {Promise<Reports.Report>}
 */
export async function createNewAuditForConfig(config, meta = {}) {
    const { url, device } = config;
    const transformAuditCurry = curry(lighthouseTransformer);
    try {
        const { transformed, raw } = await runLighthouse({
            config: { url, runs: 2, device },
            transformer: transformAuditCurry(config.id),
            chromePath: process.env.GOOGLE_CHROME_BIN,
            port: process.env.GOOGLE_CHROME_PORT,
        });

        const thumbnail = (raw.audits && raw.audits['screenshot-thumbnails']) ? [...raw.audits['screenshot-thumbnails'].details.items].pop().data : config.thumbnail;

        if (thumbnail !== config.thumbnail) {
            logger.debug(`Update thumbnail for ${ config.name }`);
        }

        await saveReport({ ...transformed, ...meta }, raw);
        await updateSite(config.id, { last_audit: new Date().toISOString(), thumbnail });
        reporter(AUDIT_COMPLETE, url);
        return transformed;
    } catch (e) {
        reporter(AUDIT_FAILED, url);
        logger.error(e.message);
    }
    return null;
}
