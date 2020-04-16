import { getFavoriteSites } from '../db/sites';

export const getFavSitesHandler = (request) => getFavoriteSites(request.mongo.db);
export default getFavSitesHandler;
