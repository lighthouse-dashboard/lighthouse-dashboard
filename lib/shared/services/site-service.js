import mongoose from 'mongoose';
import logger from '../../logger';
import { AUDIT_SCHEDULED } from '../../reporter/Events';
import { report } from '../../reporter/index';
import { SiteModel } from '../models/sites-model';

/**
 * Find sites
 * @param { object } find
 * @param { object } sort
 * @param { number } limit
 * @param {boolean} getAll
 * @return {Promise<Sites.SiteModel[]>}
 */
export async function findSites(find, sort = {}, limit = 100, getAll = false) {
    const findQuery = getAll ? find : { ...find, is_public: true };
    const sites = await SiteModel
        .find(findQuery)
        .sort(sort)
        .limit(limit);

    return sites.map(s => s.toJSON());
}

/**
 * Get list of sites from DB
 * @param {number} limit
 * @param {boolean} getAll
 * @return {Promise<Sites.SiteModel[]>}
 */
export const getAllSites = (limit = 100, getAll = false) => findSites({}, { name: 1 }, limit, getAll);

/**
 * Get list of sites from DB
 * @param {number} limit
 * @param {boolean} getAll
 * @return {Promise<Sites.SiteModel[]>}
 */
export const getFavoriteSites = (limit = 100, getAll) => findSites({ is_favorite: true }, { last_audit: -1 }, limit, getAll);

/**
 * Get list of scheduled sites
 * @param {number} limit
 * @param {boolean} getAll
 * @return {Promise<Sites.SiteModel[]>}
 */
export const getScheduledSites = (limit = 100, getAll) => findSites({
    is_scheduled: true,
    is_disabled: false,
}, {}, limit, getAll);

/**
 * Get latest n audited sites
 * @param {number} limit
 * @param {boolean} getAll
 * @return {Promise<Sites.SiteModel[]>}
 */
export const getLatestSites = (limit = 100, getAll) => findSites({
    last_audit: {
        $exists: true,
        $ne: null,
    },
}, { last_audit: -1 }, limit, getAll);

/**
 * Add new site to DB
 * @param {Pick<Sites.SiteModel, "name"|"device"|"url"|"is_favorite">} config
 * @return {Promise<Sites.SiteModel>}
 */
export async function addSite(config) {
    logger.info(`Create new site ${ JSON.stringify(config) }`);
    const site = new SiteModel({ ...config, thumbnail: null, is_scheduled: true });
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
    await SiteModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, delta);
    const site = await SiteModel.findById(new mongoose.Types.ObjectId(id));
    return site.toJSON();
}

/**
 * Remove site from DB
 * @param {string} id
 */
export async function removeSite(id) {
    await SiteModel.remove({ _id: new mongoose.Types.ObjectId(id) });
}

/**
 * Get config for specific site
 * @param {string} id
 * @return {Promise<Sites.SiteModel | null>}
 */
export async function getSiteConfigById(id) {
    const site = await SiteModel.findById(new mongoose.Types.ObjectId(id));
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
    logger.debug(`Update scheduled_jobs of ${ config.name } to ${ isScheduled }`);
    await report(AUDIT_SCHEDULED, config, isScheduled);
}

