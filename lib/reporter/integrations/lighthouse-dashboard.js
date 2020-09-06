import logger from '../../logger';
import { createAuditError } from '../../shared/services/message-service';
import { saveReport } from '../../shared/services/report-service';
import { updateSite } from '../../shared/services/site-service';

/**
 * Schedule new audit for site
 * @param {Sites.SiteModel} siteModel
 * @param {boolean} isScheduled
 * @return {Promise<void>}
 */
export const onAuditScheduled = async (siteModel, isScheduled) => {
    await updateSite(siteModel._id, { is_scheduled: isScheduled });
};

/**
 * Log new error message for site
 * @param {Sites.SiteModel} site
 * @param {string} message
 * @return {Promise<void>}
 */
export const onAuditFailed = async (site, message) => {
    await createAuditError(site, message);
};

/**
 * Persist data if audit is complete
 * @param {Sites.SiteModel} site
 * @param {Reports.Report} report
 * @param {LH.Result} raw
 * @return {Promise<void>}
 */
export const onAuditComplete = async (site, report, raw) => {
    const thumbnail = (raw.audits && raw.audits['screenshot-thumbnails']) ? [...raw.audits['screenshot-thumbnails'].details.items].pop().data : config.thumbnail;

    if (thumbnail !== site.thumbnail) {
        logger.debug(`Update thumbnail for ${ site.name }`);
    }

    await saveReport({ ...report, site: site._id }, raw);
    await updateSite(site._id, { last_audit: new Date().toISOString(), thumbnail });
};
