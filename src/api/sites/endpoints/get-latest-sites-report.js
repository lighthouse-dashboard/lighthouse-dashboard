import { MEDIUM } from '../../../config/cache';
import { getAllSites } from '../../../models/sites';
import * as ReportService from '../../../services/report-service';
import { siteWithReportList } from '../schemas/site-with-report';

/**
 * Get latest sites
 * @return {Promise<{site: Sites.SiteModel, report: Reports.Report}[]>}
 */
async function getLatestSitesReport() {
    const sites = await getAllSites();
    const results = [];

    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
        const report = await ReportService.getLatestReportBySiteId(site.id);
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
