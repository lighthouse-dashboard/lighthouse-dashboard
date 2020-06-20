import { getReportsBySiteId } from '../../../services/report-service';
import { reportIdParamModel } from '../schemas/report-id-param-model';
import { reportModelList } from '../schemas/report-model-schema';

/**
 * Handler for latest created reports
 * @param {hapi.Request.params} params
 * @param {MongodbDecoration} mongo
 * @return {Promise<Reports.Report[]>}
 */
function getReports({ params, mongo }) {
    const { id } = params;
    return getReportsBySiteId(mongo.db, id);
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
