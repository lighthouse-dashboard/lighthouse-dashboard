import curry from 'lodash.curry';
import runLighthouse from '../audit/run-lighthouse';
import saveAudit from '../database/save-audit';
import lighthouseTransformer from '../transformer/lighthouse-transformer';
import getConfigForPage from '../utils/get-config-for-page';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @return {Promise<AuditDocument>}
 */
export default async function runAuditHandler(request) {
    const { id } = request.params;
    const { message } = request.query;
    const config = getConfigForPage(id);
    if (!config) {
        return Boom.notFound('Config not found');
    }
    const { url, runs, device } = getConfigForPage(id);

    const transformAuditCurry = curry(lighthouseTransformer);
    const data = await runLighthouse({ pageUrl: url, runs, device }, transformAuditCurry(id));

    await saveAudit({ ...data, message });
    return data;
}
