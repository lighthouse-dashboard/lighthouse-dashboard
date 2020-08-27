import { getAuditWorkerInfo } from '../../../../lib/audit-worker/utils/get-audot-worker-info';
import { MEDIUM } from '../../../config/cache';
import { systemInfoModel } from '../schemas/system-info-model';

/**
 * Get system info
 * @param {hapi.Request} request
 * @param {object} h
 * @return {Promise<SystemAPI.Info>}
 */
async function getSystemInfo(request, h) {
    const config = await getAuditWorkerInfo();
    return h.response({
        ...config,
    });
}

export default {
    method: 'GET',
    path: '/api/system',
    handler: getSystemInfo,
    options: {
        description: 'Get system info',
        tags: ['api', 'system'],
        auth: 'jwt',
        response: {
            schema: systemInfoModel,
        },
        cache: {
            expiresIn: MEDIUM,
            privacy: 'private',
        },
    },
};
