import * as api from '../../../api/sites-api';
import { SET_CURRENT_SITE_CONFIG, SET_SITES, UPDATE_SITE } from '../mutation-types';

/**
 * Fetch all sites
 * @return {Promise<T>}
 */
export async function fetchAllSites({ commit }) {
    const sites = await api.getAllSites();
    commit({ type: SET_SITES, sites });
}

/**
 * Get list of scheduled sites
 * @return {Promise<Sites.SiteConfig[]>}
 */
export function fetchScheduledSites() {
    return api.getScheduledSites();
}

/**
 * Delete site by id
 * @param {object} _
 * @param {string} siteId
 */
export async function deleteSite(_, { id }) {
    await api.deleteSite(id);
}

/**
 * Create a new site
 * @param {object} _
 * @param {Sites.SiteConfig} siteConfig
 * @return {Promise<void>}
 */
export function createSite(_, { siteConfig }) {
    return api.createSite(siteConfig);
}

/**
 * Update a site
 * @param {string} id
 * @param {Partial<Sites.SiteConfig>}delta
 * @return {Promise<void>}
 */
export async function updateSite({ commit }, { id, delta }) {
    await api.updateSite(id, delta);
    commit({ type: UPDATE_SITE, id: id, delta });
}

/**
 * Fetch latest audited sites
 * @param {function} commit
 * @return {Promise<T>}
 */
export async function getLatestSites() {
    const sites = await api.getLatestSites();
    return sites;
}

/**
 * Get specific site
 * @param {object} _
 * @param {string} siteId
 * @return {Promise<Sites.SiteConfig>}
 */
export function getSite(_, { siteId }) {
    return api.getSite(siteId);
}

/**
 * Get specific site
 * @param {function} commit
 * @param {string} siteId
 * @return {Promise<Sites.SiteConfig>}
 */
export async function getCurrentSite({ commit }, { siteId }) {
    const site = await api.getSite(siteId);
    commit({ type: SET_CURRENT_SITE_CONFIG, config: site });
    return site;
}

/**
 * Get sites with corresponsing latest report
 * @return {Promise<Sites.SiteWithReport[]>}
 */
export function getSitesWithLatestReport() {
    return api.getSitesWithLatestReport();
}

/**
 * Reset current page in state
 * @param {function} commit
 */
export function resetCurrentSite({ commit }) {
    commit({ type: SET_CURRENT_SITE_CONFIG, config: null });
}

/**
 * Search for a page
 * @param {function} commit
 * @param {string} query
 * @return {Promise<void>}
 */
export async function searchForPages({ commit }, { query }) {
    const sites = await api.search(query);
    commit({ type: SET_SITES, sites });
}

/**
 * Set collection of sites in store
 * @param {function} commit
 * @param {Sites.SiteConfig[]} sites
 */
export function setSites({ commit }, { sites }) {
    commit({ type: SET_SITES, sites });
}
