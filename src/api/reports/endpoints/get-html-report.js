import { Boom } from '@hapi/boom';
import joi from '@hapi/joi';
import { createHTMLReportById } from '../../../../lib/core/services/report-service';
import { LIFE_TIME } from '../../../config/cache';
import { getAuthStrategy } from '../../../utils/get-auth-strategy';

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
        auth: getAuthStrategy(),
        validate: {
            params: joi.object({
                id: joi
                    .string()
                    .required()
                    .label('Report UUID'),
            }).label('GetHTMLReportParams'),
        },
        response: {
            schema: joi.string().label('HTML Markup'),
        },
        cache: {
            expiresIn: LIFE_TIME,
            privacy: 'public',
        },
    },
};
