import { getLatestReportBySiteId } from '../../reports/db/reports';
import { getAllSites } from '../db/sites';

export default async function getLatestSitesReport(request) {
    const sites = await getAllSites(request.mongo.db);
    const results = [];

    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];

        results.push({
            site,
            report: {
                ...(await getLatestReportBySiteId(request.mongo.db, site.id)),
                raw: null,
            },
        });
    }

    return results;
}
