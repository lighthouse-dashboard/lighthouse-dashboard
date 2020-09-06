import curry from 'lodash.curry';
import logger from '../../logger';
import lighthouseTransformer from './lighthouse-transformer';
import runLighthouse from './run-lighthouse';

/**
 * Create new audit
 * @param {Sites.SiteModel} config
 * @param {Reports.ReportMeta | {}} meta
 * @return {Promise<Reports.Report>}
 */
export function createNewAuditForConfig(config) {
    const { url, device } = config;
    const transformAuditCurry = curry(lighthouseTransformer);
    try {
        return runLighthouse({
            config: { url, runs: 2, device },
            transformer: transformAuditCurry(config._id),
            chromePath: process.env.GOOGLE_CHROME_BIN,
            port: process.env.GOOGLE_CHROME_PORT,
        });
    } catch (e) {
        logger.error(e.message);
        throw e;
    }
}
