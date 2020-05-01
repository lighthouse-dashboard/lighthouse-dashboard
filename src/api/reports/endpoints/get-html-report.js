const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
import { Boom } from '@hapi/boom';
import { getReportById } from '../db/reports';
import { reportIdParamModel } from '../schemas/report-id-param-model';

async function getHtmlReportHandler(request) {
    const { id } = request.params;

    const report = await getReportById(request.mongo.db, id);
    if (!report) {
        throw Boom.notFound();
    }

    if (!report.raw) {
        throw Boom.notFound('Report does not have raw data');
    }

    return ReportGenerator.generateReport(JSON.parse(report.raw), 'html');
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
