import { getAllSites } from '../../../database/sites';
import { spawnNewAuditsWorker } from '../../../utils/create-new-audit';

/**
 * Execute an audit
 * @param {hapi.Request} request
 * @param {object} h hapi request utils
 * @return {Promise<AuditDocument>}
 */
export default async function createReportForAll(request, h) {
    const sites = await getAllSites();
    const ids = sites.map((site) => site.id);
    spawnNewAuditsWorker(ids);


    return h.response().code(201);
}

