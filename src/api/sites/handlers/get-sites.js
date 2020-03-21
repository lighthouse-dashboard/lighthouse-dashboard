import { findSites, getAllSites } from '../../../database/sites';

export default function getSitesHandler(request) {
    const { query } = request.query;

    if (!!query) {
        try {
            return findSites({ $text: { $search: query } });
        } catch (e) {
            console.log(e);
        }
    }

    return getAllSites();
}
