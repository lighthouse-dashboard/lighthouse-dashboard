import { getLatestSites } from '../db/sites';

export const getLatestSitesHandler = (request) => getLatestSites(request.mongo.db);
export default getLatestSitesHandler;
