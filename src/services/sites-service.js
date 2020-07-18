/**
 * Get list of all scheduled sites
 * @param {Db} db
 * @param {number} limit
 * @returns {Sites.SiteModel[]}
 */
import { findSites } from '../models/sites';



export const getAllSites = () => {
    return findSites({}, { last_audit: -1 });
};
