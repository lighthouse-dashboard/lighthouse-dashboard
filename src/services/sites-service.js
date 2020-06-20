/**
 * Get list of all scheduled sites
 * @param {Db} db
 * @param {number} limit
 */
import { findSites } from '../models/sites';

export const getScheduledSites = async (db, limit = 50) => {
    const sites = await findSites(db, { is_scheduled: true }, {}, limit);
    return sites;
};
