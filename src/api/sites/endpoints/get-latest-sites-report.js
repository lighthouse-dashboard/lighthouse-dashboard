import { MEDIUM } from '../../../config/cache';
import { getLatestReportBySiteId } from '../../../models/reports';
import { getAllSites } from '../../../models/sites';
import { siteWithReportList } from '../schemas/site-with-report';

/**
 * Get latest sites
 * @param {MongodbDecoration} mongo
 * @return {Promise<{site: Sites.SiteModel, report: Reports.Report}[]>}
 */
async function getLatestSitesReport({ mongo }) {
    const sites = await getAllSites(mongo.db);
    const results = [];

    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        const report = await getLatestReportBySiteId(site.id);
        if (!report) {
            continue;
        }

        results.push({
            site,
            report: {
                ...report,
                hasRaw: !!report.raw,
                raw: null,
            },
        });
    }

    return results;
}

export default {
    method: 'GET',
    path: '/api/sites/latest-reports',
    handler: getLatestSitesReport,
    options: {
        description: 'Get latest audited sites with report',
        tags: ['api', 'sites'],
        auth: 'jwt',
        response: {
            schema: siteWithReportList,
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
