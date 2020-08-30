import { getFavoriteSites, getLatestSites } from '../../lib/core/services/site-service';
import { getDefaultParams } from '../router/utils/get-default-params';

export default {
    method: 'GET',
    path: '/app/dashboard',
    options: {
        description: 'Dashboard page',
        auth: 'jwt',
    },
    handler: async (request, h) => {
        const favoriteSites = await getFavoriteSites();
        const latestSites = (await getLatestSites()).slice(0, 4);
        return h.view('views/dashboard.twig', { ...getDefaultParams(request), favoriteSites, latestSites });
    },
};
