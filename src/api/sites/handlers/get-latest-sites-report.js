import { getLatestReportBySiteId } from '../../reports/db/reports';
import { getAllSites } from '../db/sites';

export default async function getLatestSitesReport(request) {
    const sites = await getAllSites(request.mongo.db);
    const results = [];

    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        const report = await getLatestReportBySiteId(request.mongo.db, site.id);
        if (!report) {
            continue;
        }

        results.push({
            site,
            report: {
                ...report,
                raw: null,
            },
        });
    }

    return results;
}
