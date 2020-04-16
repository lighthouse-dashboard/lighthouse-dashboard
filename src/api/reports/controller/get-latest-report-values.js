import Boom from '@hapi/boom';
import CONFIG from '../../../../config/dashboard';
import formatReportSummaryString from '../../../utils/format-report-summary-string';
import { getReportValueScoreByKey } from '../../../utils/get-report-value-score-by-key';
import { getSiteConfigById } from '../../sites/db/sites';
import { getLatestReportBySiteId } from '../db/reports';

/**
 * Handler to get latest latest created report values
 * @param {hapi.Request} request
 * @return {Promise<void>}
 */
export default async function getLatestReportValues(request) {
    const { siteId } = request.params;

    const config = getSiteConfigById(request.mongo.db, siteId);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const report = await getLatestReportBySiteId(request.mongo.db, siteId);
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
