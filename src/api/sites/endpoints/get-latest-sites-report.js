import { MEDIUM } from '../../../config/cache';
import { getLatestReportBySiteId } from '../../../../lib/shared/services/report-service';
import { getAllSites } from '../../../../lib/shared/services/site-service';
import { getAuthStrategy } from '../../../utils/get-auth-strategy';
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
        const report = await getLatestReportBySiteId(site.id);
        if (!report) {
            continue;
        }

        results.push({
            site,
            report: {
                ...report,
                hasRaw: !!report.raw,
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
        auth: getAuthStrategy(),
        response: {
            schema: siteWithReportList,
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
