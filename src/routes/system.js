import { getAuditWorkerInfo } from '../../lib/audit-worker/utils/get-audit-worker-info';
import { getDefaultParams } from '../router/utils/get-default-params';

export default {
    method: 'GET',
    path: '/app/system',
    options: {
        description: 'System view',
        auth: {
            strategy: 'jwt',
            mode: 'optional',
        },
    },
    handler: async (request, h) => {
        const config = await getAuditWorkerInfo();
        return h.view('views/system.twig', { ...getDefaultParams(request), info: config });
    },
};
