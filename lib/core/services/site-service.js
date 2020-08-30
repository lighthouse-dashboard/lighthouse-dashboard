import uuid from 'uuid/v4';
import logger from '../../logger';
import { AUDIT_SCHEDULED } from '../../reporter/Events';
import { report } from '../../reporter/index';
import { SiteModel } from '../models/sites-model';

/**
 * Find sites
 * @param { object } find
 * @param { object } sort
 * @param { number } limit
 * @return {Promise<Sites.SiteModel[]>}
 */
export async function findSites(find, sort = {}, limit = 100) {
    const sites = await SiteModel
        .find(find)
        .sort(sort)
        .limit(limit);

    return sites.map(s => s.toJSON());
}

/**
 * Get list of sites from DB
 * @return {Promise<Sites.SiteModel[]>}
 */
export function getAllSites() {
    return findSites({}, { name: 1 });
}

/**
 * Get list of sites from DB
 * @return {Promise<Sites.SiteModel[]>}
 */
export async function getFavoriteSites() {
    const sites = await SiteModel.find({ is_favorite: true }).sort({ name: 1 });
    return sites.map(s => s.toJSON());
}

/**
 * Get latest n audited sites
 * @param {number} limit
 * @return {Promise<Sites.SiteModel[]>}
 */
export async function getLatestSites(limit = 50) {
    const sites = await SiteModel.find({
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
    logger.info(`Create new site ${ JSON.stringify(config) }`);
    const site = new SiteModel({ ...config, id: uuid(), thumbnail: null, is_scheduled: true });
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
    logger.debug(`Update site ${ id } with ${ Object.keys(delta).join(',') }`);
    await SiteModel.updateOne({ id }, delta);
    const site = await SiteModel.findOne({ id });
    return site.toJSON();
}

/**
 * Remove site from DB
 * @param {string} id
 */
export async function removeSite(id) {
    await SiteModel.remove({ id });
}

/**
 * Get config for specific site
 * @param {string} id
 * @return {Promise<Sites.SiteModel | null>}
 */
export async function getSiteConfigById(id) {
    const site = await SiteModel.findOne({ id });
    if (!site) {
        return null;
    }
    return site.toJSON();
}

/**
 * Update the amount of scheduled jobs
 * @param {Sites.SiteModel} config
 * @param {boolean} isScheduled
 */
export async function setScheduledAuditForSite(config, isScheduled) {
    report(AUDIT_SCHEDULED);
    logger.debug(`Update scheduled_jobs of ${ config.name } to ${ isScheduled }`);
    await updateSite(config.id, { is_scheduled: isScheduled });
}

/**
 * Get list of scheduled sites
 * @param {number} limit
 * @return {Promise<Sites.SiteModel[]>}
 */
export const getScheduledSites = (limit = 50) => {
    return findSites({ is_scheduled: true, is_disabled: false }, {}, limit);
};
