import CONFIG from '../../../../config/dashboard';
import reportsToBarChart from '../../../transformer/report-to-bar-chart';
import { getFavoriteSites } from '../../sites/db/sites';
import { getLatestReportBySiteId } from '../db/reports';
import { barChartDataModel } from '../schemas/bar-chart-data-model';

/**
 * Get overview over projects by specific timing id
 * @param {hapi.Request} request
 * @return {Promise<BarChartData>}
 */
async function getSpeedReportOverview(request) {
    const pages = await getFavoriteSites(request.mongo.db);
    const labels = [];

    const reports = [];
    for (let p = 0; p < pages.length; p++) {
        const report = await getLatestReportBySiteId(request.mongo.db, pages[p].id);
        if (!report) {
            continue;
        }
        labels.push(pages[p].name);
        reports.push(report);
    }

    return reportsToBarChart(reports, labels, CONFIG.favoriteProjectsComparison.fields);
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
