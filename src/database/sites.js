import uuid from 'uuid/v4';
import { DASHBOARD } from '../../dashboard.config';
import { SITES_CONFIG_COLLECTION } from '../config/db';
import connectDatabase from '../database/connect-database';

/**
 * Find sites
 * @param {object} find
 * @param {sort} sort
 * @param {number} limit
 * @return {Promise<SiteConfig[]>}
 */
async function findSites(find, sort, limit = 100) {
    const { database, client } = await connectDatabase();
    const collection = database.collection(SITES_CONFIG_COLLECTION);

    return new Promise((resolve, reject) => {
        collection
            .find(find)
            .sort(sort)
            .limit(limit)
            .toArray((error, data) => {
                if (error) {
                    return reject(error);
                }

                if (!data || data.length === 0) {
                    return resolve([]);
                }

                return resolve(data);
            });
        client.close();
    });
}

/**
 * Get list of sites from DB
 * @return {Promise<SiteConfig[]>}
 */
export function getAllSites() {
    return findSites({}, { last_audit: -1 });
}

/**
 * Get list of sites from DB
 * @return {Promise<SiteConfig[]>}
 */
export function getFavoriteSites() {
    return findSites({ isFavorite: true }, { order: 1 });
}

/**
 * Get latest n audited sites
 * @return {Promise<SiteConfig[]>}
 */
export function getLatestSites() {
    return findSites({ last_audit: { $exists: true, $ne: null } }, { last_audit: -1 }, DASHBOARD.latestAudits.limit);
}

/**
 * Add new site to DB
 * @param {Pick<SiteConfig, "name"|"device"|"url"|"isFavorite">} config
 * @return {Promise<SiteConfig>}
 */
export async function addSite(config) {
    const { database, client } = await connectDatabase();
    const siteCollection = database.collection(SITES_CONFIG_COLLECTION);
    const id = uuid();
    siteCollection.insertOne({ id, ...config });
    client.close();
    return getSiteConfigById(id);
}

/**
 * Update site config
 * @param {string} id
 * @param {Partial<SiteConfig>} delta
 * @return {Promise<SiteConfig>}
 */
export async function updateSite(id, delta) {
    const { database, client } = await connectDatabase();
    const siteCollection = database.collection(SITES_CONFIG_COLLECTION);
    siteCollection.updateOne({ id }, { $set: delta });
    client.close();
    return getSiteConfigById({ id });
}

/**
 * Remove site from DB
 * @param {string} id
 * @return {Promise<void>}
 */
export async function removeSite(id) {
    const { database, client } = await connectDatabase();
    const siteCollection = database.collection(SITES_CONFIG_COLLECTION);
    siteCollection.deleteOne({ id });
    client.close();
}

/**
 * Get config for specific site
 * @param {string} id
 * @return {Promise<SiteConfig | null>}
 */
export async function getSiteConfigById(id) {
    const sites = await findSites({ id }, {}, 1);
    if (!sites || sites.length === 0) {
        return null;
    }

    return sites.pop();
}

/**
 * Get config for specific site
 * @param {string} token
 * @return {Promise<SiteConfig | null>}
 */
export async function getSiteConfigByToken(token) {
    const sites = await findSites({ token }, {}, 1);
    if (!sites || sites.length === 0) {
        return null;
    }

    return sites.pop();
}
