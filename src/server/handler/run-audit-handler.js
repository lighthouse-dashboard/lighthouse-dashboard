import runAudit from '../audit/run-audit';
import saveAudit from '../database/save-audit';
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

    const data = await runAudit(url, runs, device);
    await saveAudit({ ...data, siteId: id });
    return data;
}
