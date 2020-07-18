import uuid from 'uuid/v4';
import logger from '../../lib/logger';
import Sites from './sites/sites-model';

/**
 * Find sites
 * @param {Db} database
 * @param { object } find
 * @param { object } sort
 * @param { number } limit
 * @return {Promise<Sites.SiteModel[]>}
 */
export async function findSites(database, find, sort = {}, limit = 100) {
    const sites = await Sites
        .find(find)
        .sort(sort)
        .limit(limit);

    return sites.map(s => s.toJSON());
}

/**
 * Get list of sites from DB
 * @param {Db} database
 * @return {Promise<Sites.SiteModel[]>}
 */
export function getAllSites(database) {
    return findSites(database, {}, { last_audit: -1 });
}

/**
 * Get list of sites from DB
 * @param {Db} database
 * @return {Promise<Sites.SiteModel[]>}
 */
export async function getFavoriteSites() {
    const sites = await Sites.find({ is_favorite: true }).sort({ field: 'order', test: 1 });
    return sites.map(s => s.toJSON());
}

/**
 * Get latest n audited sites
 * @param {Db} database
 * @param {number} limit
 * @return {Promise<Sites.SiteModel[]>}
 */
export async function getLatestSites(database, limit = 50) {
    const sites = await Sites.find({
        last_audit: {
            $exists: true,
            $ne: null,
        },
    })
        .sort({ last_audit: -1 })
        .limit(limit);

    return sites.map(s => s.toJSON());
}

/**
 * Add new site to DB
 * @param {Pick<Sites.SiteModel, "name"|"device"|"url"|"is_favorite">} config
 * @return {Promise<Sites.SiteModel>}
 */
export async function addSite(config) {
    const site = new Sites({ ...config, id: uuid() });
    await site.save();
    return site.toJSON();
}

/**
 * Update site config
 * @param {string} id
 * @param {Partial<Sites.SiteModel>} delta
 * @return {Promise<Sites.SiteModel>}
 */
export async function updateSite(id, delta) {
    await Sites.updateOne({ id }, delta);
    const site = await Sites.findOne({ id });
    return site.toJSON();
}

/**
 * Remove site from DB
 * @param {string} id
 */
export async function removeSite(id) {
    await Sites.remove({ id });
}

/**
 * Get config for specific site
 * @param {Db} database
 * @param {string} id
 * @return {Promise<Sites.SiteModel | null>}
 */
export async function getSiteConfigById(id) {
    const site = await Sites.findOne({ id });
    return site.toJSON();
}

/**
 * Update the amount of scheduled jobs
 * @param {Db} database
 * @param {Sites.SiteModel} config
 * @param {boolean} isScheduled
 */
export async function setScheduledAuditForSite(database, config, isScheduled) {
    logger.debug(`Update scheduled_jobs of ${ config.name } to ${ isScheduled }`);
    await updateSite(config.id, { is_scheduled: isScheduled });
}
