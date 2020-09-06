import Quickmetrics from 'quickmetrics';
import { AUDIT_COMPLETE } from '../Events';

const qm = new Quickmetrics({
    apiKey: process.env.QUICK_METRICS_KEY,
    maxBatchSize: 1,
});


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
