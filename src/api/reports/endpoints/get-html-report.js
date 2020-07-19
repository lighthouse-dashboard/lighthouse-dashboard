import { Boom } from '@hapi/boom';
import { LIFE_TIME } from '../../../config/cache';
import { createHTMLReportById } from '../../../services/report-service';
import { reportIdParamModel } from '../schemas/report-id-param-model';

/**
 * Get html report handler
 * @param {object} params
 * @return {Promise<string|string[]>}
 */
async function getHtmlReportHandler({ params }) {
    const { id } = params;

    const report = await createHTMLReportById(id);
    if (!report) {
        throw Boom.notFound();
    }

    return report;
}

export default {
    method: 'GET',
    path: '/api/reports/report/{id}',
    handler: getHtmlReportHandler,
    options: {
        description: 'Get lighthouse html report',
        tags: ['api', 'reports'],
        auth: 'jwt',
        validate: {
            params: reportIdParamModel,
        },
        cache: {
            expiresIn: LIFE_TIME,
            privacy: 'public',
        },
    },
};
