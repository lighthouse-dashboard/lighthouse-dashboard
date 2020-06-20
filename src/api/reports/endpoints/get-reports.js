import Boom from '@hapi/boom';
import CONFIG from '../../../../config/server';
import { getReportsBySiteId } from '../../../services/models/reports';
import { getSiteConfigById } from '../../../services/models/sites';
import { reportIdParamModel } from '../schemas/report-id-param-model';
import { reportModelList } from '../schemas/report-model-schema';

/**
 * Handler for latest created reports
 * @param {hapi.Request.params} params
 * @param {MongodbDecoration} mongo
 * @return {Report[]}
 */
async function getReports({ params, mongo }) {
    const { id } = params;

    const config = getSiteConfigById(mongo.db, id);
    if (!config) {
        return Boom.notFound(`Site with id not found`);
    }

    const assets = await getReportsBySiteId(mongo.db, id, CONFIG.api.siteReportLimit);
    if (!assets || assets.length === 0) {
        return [];
    }

    return assets.map((report) => {
        report.hasRawData = !!report.raw;
        report.raw = null;
        return report;
    });
}

export default {
    method: 'GET',
    path: '/api/reports/{id}',
    handler: getReports,
    options: {
        description: 'Get recent report entries for site',
        tags: ['api', 'reports'],
        auth: 'jwt',
        validate: {
            params: reportIdParamModel,
        },
        response: {
            schema: reportModelList,
        },
    },
};
