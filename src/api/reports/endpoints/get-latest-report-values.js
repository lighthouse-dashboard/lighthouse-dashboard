import Boom from '@hapi/boom';
import joi from '@hapi/joi';
import { getLatestReportBySiteId } from '../../../../lib/core/services/report-service';
import { MEDIUM } from '../../../config/cache';

/**
 * Handler to get latest latest created report values
 * @param {object} params
 * @return {Promise<Reports.Report | null>}
 */
async function getLatestReportValues({ params }) {
    const { siteId } = params;

    const report = await getLatestReportBySiteId(siteId);
    if (!report) {
        return Boom.notFound();
    }
    return report;
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
            params: joi.object({
                siteId: joi
                    .string()
                    .required(),
            })
                .label('GetLatestReportValuesParams'),
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
