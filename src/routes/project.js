import CONFIG from '../../config/server';
import { getReportsBySiteId } from '../../lib/core/services/report-service';
import { getDefaultParams } from '../router/utils/get-default-params';
import { getSiteConfigById } from '../../lib/core/services/site-service';

export default {
    method: 'GET',
    path: '/app/projects/{id}',
    options: {
        description: 'Details of project',
        auth: 'jwt',
    },
    handler: async (request, h) => {
        const { id } = request.params;
        const site = await getSiteConfigById(id);
        const reports = await getReportsBySiteId(id, CONFIG.api.siteReportLimit);
        return h.view('views/project.twig', { ...getDefaultParams(request), site, reports });
    },
};
