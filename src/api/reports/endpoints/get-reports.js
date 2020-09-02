import joi from '@hapi/joi';
import { getReportsBySiteId } from '../../../../lib/core/services/report-service';
import { MEDIUM } from '../../../config/cache';
import { getAuthStrategy } from '../../../utils/get-auth-strategy';
import { reportModelList } from '../schemas/report-model-schema';

/**
 * Handler for latest created reports
 * @param {hapi.Request.params} params
 * @return {Promise<Reports.Report[]>}
 */
function getReports({ params }) {
    const { id } = params;
    return getReportsBySiteId(id, 50);
}

export default {
    method: 'GET',
    path: '/api/reports/{id}',
    handler: getReports,
    options: {
        description: 'Get recent report entries for site',
        tags: ['api', 'reports'],
        auth: getAuthStrategy(),
        validate: {
            params: joi.object({
                id: joi
                    .string()
                    .required(),
            }).label('GetReportsParams'),
        },
        response: {
            schema: reportModelList,
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
