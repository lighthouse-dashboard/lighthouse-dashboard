import Boom from '@hapi/boom';
import { getSiteConfigById } from '../../../services/models/sites';
import { getLatestReportBySiteId } from '../../../services/models/reports';
import { siteIdParamModel } from '../schemas/siteid-param-model';

/**
 * Handler to get latest latest created report values
 * @param {object} params
 * @param {MongodbDecoration} mongo
 * @return {Promise<Reports.Report | null>}
 */
async function getLatestReportValues({ params, mongo }) {
    const { siteId } = params;

    const config = getSiteConfigById(mongo.db, siteId);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const report = await getLatestReportBySiteId(mongo.db, siteId);

    if (!report) {
        return null;
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
            params: siteIdParamModel,
        },
    },
};
