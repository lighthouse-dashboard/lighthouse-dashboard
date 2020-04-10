import { findSites, getAllSites } from '../db/sites';

/**
 * Get sites
 * @param {object} request
 * @return {Promise<SiteConfig[]>}
 */
export default function getSitesHandler(request) {
    const { query } = request.query;

    if (query) {
        try {
            return findSites({ $text: { $search: query } });
        } catch (e) {
            console.log(e);
        }
    }

    return getAllSites();
}
