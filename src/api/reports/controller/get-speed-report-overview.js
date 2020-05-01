import CONFIG from '../../../../config/dashboard';
import reportsToBarChart from '../../../transformer/report-to-bar-chart';
import { getFavoriteSites } from '../../sites/db/sites';
import { getLatestReportBySiteId } from '../db/reports';

/**
 * Get overview over projects by specific timing id
 * @param {hapi.Request} request
 * @return {Promise<BarChartData>}
 */
export default async function getSpeedReportOverview(request) {
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
