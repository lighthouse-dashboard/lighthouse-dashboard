import { getLatestReportBySiteId } from '../../../../lib/core/db/models/reports';
import { getFavoriteSites } from '../../../../lib/core/db/models/sites';
import reportsToBarChart from '../../../transformer/report-to-bar-chart';
import { getFieldsFromReport } from '../../../utils/get-fields-form-reports';
import { barChartDataModel } from '../schemas/bar-chart-data-model';

/**
 * Get overview over projects by specific timing id
 * @param {MongodbDecoration} mongo
 * @return {Promise<BarChartData>}
 */
async function getSpeedReportOverview({ mongo }) {
    const pages = await getFavoriteSites(mongo.db);
    const labels = [];

    const reports = [];
    for (let p = 0; p < pages.length; p++) {
        const report = await getLatestReportBySiteId(mongo.db, pages[p].id);
        if (!report) {
            continue;
        }
        labels.push(pages[p].name);
        reports.push(report);
    }

    return reportsToBarChart(reports, labels, getFieldsFromReport(reports[0]));
}

export default {
    method: 'GET',
    path: '/api/reports/overview',
    handler: getSpeedReportOverview,
    options: {
        description: 'Get chart data for speed overview of favorited projects',
        tags: ['api', 'reports'],
        auth: 'jwt',
        response: {
            schema: barChartDataModel,
        },
    },
};
