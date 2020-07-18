/**
 * Get list of all scheduled sites
 * @param {Db} db
 * @param {number} limit
 * @returns {Sites.SiteModel[]}
 */
import { findSites } from '../models/sites';

export const getScheduledSites = (db, limit = 50) => {
    return findSites(db, { is_scheduled: true, disabled: false }, {}, limit);
};
