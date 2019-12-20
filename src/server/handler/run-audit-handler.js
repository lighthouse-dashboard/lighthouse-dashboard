import curry from 'lodash.curry';
import lighthouseTransformer from '../transformer/lighthouse-transformer';
import runLighthouse from '../audit/run-lighthouse';
import saveAudit from '../database/save-audit';
import pwmetricsTransformer from '../transformer/pwmetrics-transformer';
import getConfigForPage from '../utils/get-config-for-page';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @return {Promise<AuditDocument>}
 */
export default async function runAuditHandler(request) {
    const { id } = request.params;
    const config = getConfigForPage(id);
    if (!config) {
        return Boom.badRequest('Config not found');
    }
    const { url, runs, device } = getConfigForPage(id);

    const transformAuditCurry = curry(lighthouseTransformer);
    //const data = await runPwmetrics({ url, runs, device }, transformAuditCurry(id));
    const data = await runLighthouse({ pageUrl: url, runs, device }, transformAuditCurry(id));


    await saveAudit(data);
    return data;
}
