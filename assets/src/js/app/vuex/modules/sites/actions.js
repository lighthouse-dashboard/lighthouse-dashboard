import * as api from '../../../api/sites-api';
import { ADD_SITE, SET_CURRENT_SITE_CONFIG, SET_LATEST_SITES, SET_SITES, UPDATE_SITE } from '../mutation-types';

/**
 * Fetch all sites
 * @return {Promise<T>}
 */
export async function fetchAllSites({ commit }) {
    const sites = await api.getAllSites()
    commit({ type: SET_SITES, sites });
}


/**
 * Delete site by id
 * @param {object} _
 * @param {string} siteId
 */
export async function deleteSite(_, { id }) {
    await api.deleteSite(id)
}

/**
 * Create a new site
 * @param {Sites.SiteConfig} siteConfig
 * @return {Promise<void>}
 */
export async function createSite({ commit }, siteConfig) {
    await api.createSite(siteConfig);
    commit({ type: ADD_SITE, site: data });
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
 * Fetch latest audites sites
 * @param {function} commit
 * @return {Promise<T>}
 */
export async function getLatestSites({ commit }) {
    const sites = await api.getLatestSites();
    commit({ type: SET_LATEST_SITES, sites });
    return data;
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

export function setSites({ commit }, { sites }) {
    commit({ type: SET_SITES, sites });
}
