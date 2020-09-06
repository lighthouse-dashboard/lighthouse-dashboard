import Quickmetrics from 'quickmetrics';
import { AUDIT_CHECK, AUDIT_COMPLETE, AUDIT_FAILED, CLEANUP } from '../Events';

const qm = new Quickmetrics({
    apiKey: process.env.QUICK_METRICS_KEY,
    maxBatchSize: 1,
});


/**
 * Persist data if audit is complete
 * @param {string} modelName
 * @param {number} deletedCount
 * @return {Promise<void>}
 */
export const onCleanup = async (modelName, deletedCount) => {
    await qm.event(CLEANUP, deletedCount);
};

export const onAuditCheck = async () => {
    await qm.event(AUDIT_CHECK);
};

export const onAuditFailed = async () => {
    await qm.event(AUDIT_FAILED);
};

/**
 * Persist data if audit is complete
 * @param {Sites.SiteModel} site
 * @param {Reports.Report} report
 * @param {LH.Result} raw
 * @return {Promise<void>}
 */
export const onAuditComplete = async () => {
    await qm.event(AUDIT_COMPLETE);
};
