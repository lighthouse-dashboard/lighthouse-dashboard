import joi from '@hapi/joi';
import CONFIG from '../../../../config/server';
import { getReportsBySiteId } from '../../../../lib/core/services/report-service';
import { MEDIUM } from '../../../config/cache';
import { reportModelList } from '../schemas/report-model-schema';

/**
 * Handler for latest created reports
 * @param {hapi.Request.params} params
 * @return {Promise<Reports.Report[]>}
 */
async function getReports({ params }) {
    const { id } = params;
    const r = await getReportsBySiteId(id, CONFIG.api.siteReportLimit);
    return r;
}

export default {
    method: 'GET',
    path: '/api/reports/{id}',
    handler: getReports,
    options: {
        description: 'Get recent report entries for site',
        tags: ['api', 'reports'],
        auth: {
            strategy: 'jwt',
            mode: 'optional',
        },
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
