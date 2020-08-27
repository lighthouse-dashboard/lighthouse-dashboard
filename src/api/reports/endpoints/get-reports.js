import CONFIG from '../../../../config/server';
import { MEDIUM } from '../../../config/cache';
import { getReportsBySiteId } from '../../../../lib/core/services/report-service';
import { reportIdParamModel } from '../schemas/report-id-param-model';

/**
 * Handler for latest created reports
 * @param {hapi.Request.params} params
 * @return {Promise<Reports.Report[]>}
 */
function getReports({ params }) {
    const { id } = params;
    return getReportsBySiteId(id, CONFIG.api.siteReportLimit);
}

export default {
    method: 'GET',
    path: '/api/reports/{id}',
    handler: getReports,
    options: {
        description: 'Get recent report entries for site',
        tags: ['api', 'reports'],
        auth: 'jwt',
        validate: {
            params: reportIdParamModel,
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
