import { getLatestRemoteVersion } from '../services/remote-version-service';
import { hasNewVersionAvailable, getReleaseUrl } from '../services/update-notification-service';
import { getFavoriteSites, getLatestSites } from '../../lib/shared/services/site-service';
import { getDefaultParams } from '../router/utils/get-default-params';
import { getAuthStrategy } from '../utils/get-auth-strategy';

export default {
    method: 'GET',
    path: '/app/dashboard',
    options: {
        description: 'Dashboard page',
        auth: getAuthStrategy(),
    },
    handler: async (request, h) => {
        const { isAuthenticated } = request.auth;
        const favoriteSites = await getFavoriteSites(100, isAuthenticated);
        const latestSites = (await getLatestSites(4, isAuthenticated));
        const hasNewVersion = await hasNewVersionAvailable();
        const latestRemoteVersion = await getLatestRemoteVersion();
        const versionUrl = await getReleaseUrl();
        return h.view('views/dashboard.twig', { ...getDefaultParams(request), favoriteSites, latestSites, hasNewVersion, versionUrl, latestRemoteVersion });
    },
};
