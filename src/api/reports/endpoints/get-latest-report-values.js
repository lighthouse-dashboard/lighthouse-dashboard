import Boom from '@hapi/boom';
import CONFIG from '../../../../config/dashboard';
import formatReportSummaryString from '../../../utils/format-report-summary-string';
import { getReportValueScoreByKey } from '../../../utils/get-report-value-score-by-key';
import { getSiteConfigById } from '../../sites/db/sites';
import { getLatestReportBySiteId } from '../db/reports';
import { siteIdParamModel } from '../schemas/siteid-param-model';

/**
 * Handler to get latest latest created report values
 * @param {hapi.Request} request
 * @return {Promise<void>}
 */
async function getLatestReportValues(request) {
    const { siteId } = request.params;

    const config = getSiteConfigById(request.mongo.db, siteId);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const report = await getLatestReportBySiteId(request.mongo.db, siteId);
    const values = CONFIG.latestAuditChart.fields;

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

export default {
    method: 'GET',
    path: '/api/reports/{siteId}/latest',
    handler: getLatestReportValues,
    options: {
        description: 'Get latest report for site',
        tags: ['api', 'reports'],
        auth: 'jwt',
        validate: {
            params: siteIdParamModel,
        },
    },
};
