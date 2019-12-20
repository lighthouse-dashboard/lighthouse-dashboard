import curry from 'lodash.curry';
import runAudit from '../audit/run-audit';
import saveAudit from '../database/save-audit';
import getConfigForPage from '../utils/get-config-for-page';
import transformAudit from '../utils/transform-audit';

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

    const transformAuditCurry = curry(transformAudit);
    const data = await runAudit(url, runs, device, transformAuditCurry(id));
    await saveAudit(data);
    return data;
}
