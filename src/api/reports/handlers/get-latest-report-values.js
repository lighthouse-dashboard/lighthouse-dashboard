import Boom from '@hapi/boom';
import CONFIG from '../../../../dashboard.config';
import { getLatestReportBySiteId } from '../../../database/reports';
import { getSiteConfigById } from '../../../database/sites';
import formatReportSummaryString from '../../../utils/format-report-summary-string';
import { getReportValueScoreByKey } from '../../../utils/get-report-value-score-by-key';

/**
 * Handler to get latest latest created report values
 * @param {hapi.Request} request
 * @return {Promise<void>}
 */
export default async function getLatestReportValues(request) {
    const { siteId } = request.params;

    const config = getSiteConfigById(siteId);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const report = await getLatestReportBySiteId(siteId);
    const values = CONFIG.DASHBOARD.latestAudits.fields;

    if (!report) {
        return {
            labels: [],
            series: [],
        };
    }


    return {
        message: formatReportSummaryString(report),
        labels: values,
        series: values.map(vid => getReportValueScoreByKey(report.values, vid)),
    };
}
