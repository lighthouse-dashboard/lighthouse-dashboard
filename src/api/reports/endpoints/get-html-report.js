
import { Boom } from '@hapi/boom';
import createHTMLReport from '../../../utils/create-html-report';
import { getReportById } from '../../../models/reports';
import { reportIdParamModel } from '../schemas/report-id-param-model';

/**
 * Get html report handler
 * @param {object} params
 * @param {MongodbDecoration} mongo
 * @return {Promise<string|string[]>}
 */
async function getHtmlReportHandler({ params, mongo }) {
    const { id } = params;

    const report = await getReportById(mongo.db, id);
    if (!report) {
        throw Boom.notFound();
    }

    if (!report.raw) {
        throw Boom.notFound('Report does not have raw data');
    }

    return createHTMLReport(report);
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
    },
};
