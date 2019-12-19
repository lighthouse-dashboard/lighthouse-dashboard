import createAudit from '../utils/create-audit';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @return {Promise<AuditDocument>}
 */
export default async function runAuditHandler(request) {
    const { page, runs, device } = request.query;

    const data = await createAudit(page, runs, device);
    return data;
}
