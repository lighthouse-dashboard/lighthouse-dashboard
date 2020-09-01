import Boom from '@hapi/boom';
import CONFIG from '../../config/server';
import { getReportsBySiteId } from '../../lib/core/services/report-service';
import { getSiteConfigById } from '../../lib/core/services/site-service';
import { getDefaultParams } from '../router/utils/get-default-params';
import { getAuthStrategy } from '../utils/get-auth-strategy';

export default {
    method: 'GET',
    path: '/app/projects/{id}',
    options: {
        description: 'Details of project',
        auth: getAuthStrategy(),
    },
    handler: async (request, h) => {
        const { isAuthenticated } = request.auth;

        const { id } = request.params;
        const site = await getSiteConfigById(id);
        if (!site) {
            return new Boom.notFound();
        }

        if (!site.is_public && !isAuthenticated) {
            return new Boom.unauthorized('Site is private');
        }
        const reports = await getReportsBySiteId(id, CONFIG.api.siteReportLimit);
        return h.view('views/project.twig', { ...getDefaultParams(request), site, reports });
    },
};
