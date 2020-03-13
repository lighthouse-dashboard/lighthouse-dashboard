const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
import { Boom } from '@hapi/boom';
import { getReportById } from '../../../database/reports';

export default async function getHtmlReportHandler(request) {
    const { reportId } = request.params;

    const report = await getReportById(reportId);
    if (!report) {
        throw Boom.notFound();
    }

    if (!report.raw) {
        throw Boom.notFound('Report does not have raw data');
    }

    return ReportGenerator.generateReport(JSON.parse(report.raw), 'html');
}
