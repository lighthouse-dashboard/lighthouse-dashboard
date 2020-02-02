import CONFIG from '../../../../dashboard.config';
import { getLatestReportBySiteId } from '../../../database/reports';
import { getFavoriteSites } from '../../../database/sites';
import reportsToBarChart from '../../../transformer/report-to-bar-chart';

/**
 * Get overview over projects by specific timing id
 * @return {Promise<ChartData>}
 */
export default async function getSpeedReportOverview() {
    const pages = await getFavoriteSites();
    const labels = pages.map((p) => p.id);

    const reports = [];
    for (let p = 0; p < pages.length; p++) {
        const report = await getLatestReportBySiteId(pages[p].id);
        if (!report) {
            continue;
        }
        reports.push(report);
    }

    return reportsToBarChart(reports, labels, CONFIG.DASHBOARD.favoriteProjectsComparison.fields);
}
