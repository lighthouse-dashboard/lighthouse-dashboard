import { getAuditWorkerInfo } from '../../lib/audit-worker/utils/get-audit-worker-info';
import { getDefaultParams } from '../router/utils/get-default-params';
import { getLatestRemoteVersion } from '../services/remote-version-service';
import { getReleaseUrl, hasNewVersionAvailable } from '../services/update-notification-service';
import { getAuthStrategy } from '../utils/get-auth-strategy';

export default {
    method: 'GET',
    path: '/app/system',
    options: {
        description: 'System view',
        auth: getAuthStrategy(),
    },
    handler: async (request, h) => {
        const config = await getAuditWorkerInfo();
        const hasNewVersion = await hasNewVersionAvailable();
        const latestRemoteVersion = await getLatestRemoteVersion();
        const versionUrl = await getReleaseUrl();

        return h.view('views/system.twig', {
            ...getDefaultParams(request),
            info: config,
            hasNewVersion,
            latestRemoteVersion,
            versionUrl,
        });
    },
};
