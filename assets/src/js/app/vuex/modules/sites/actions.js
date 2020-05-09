import {
    CREATE_SITE_URL,
    GET_LATEST_AUDITED_SITES_URL,
    GET_SITE_BY_ID_URL,
    GET_SITE_WITH_REPORT_URL,
    GET_SITES_URL,
    POST_SITE_ALL_URL,
    REMOVE_SITE_URL,
} from '../../../config/routes';
import axios from '../../../utils/axios';
import { ADD_SITE, SET_CURRENT_SITE_CONFIG, SET_LATEST_SITES, SET_SITES, UPDATE_SITE } from '../mutation-types';

/**
 * Fetch all sites
 * @return {Promise<T>}
 */
export async function fetchAllSites({ commit }) {
    const { data } = await axios().get(GET_SITES_URL);
    commit({ type: SET_SITES, sites: data });
}


/**
 * Delete site by id
 * @param {object} _
 * @param {string} siteId
 */
export function deleteSite(_, { id }) {
    axios().delete(REMOVE_SITE_URL(id));
}

/**
 * Create a new site
 * @param {Sites.SiteConfig} siteConfig
 * @return {Promise<void>}
 */
export async function createSite({ commit }, siteConfig) {
    const { data } = await axios()
        .post(CREATE_SITE_URL, siteConfig);

    commit({ type: ADD_SITE, site: data });
}

/**
 * Update a site
 * @param {string} id
 * @param {Partial<Sites.SiteConfig>}delta
 * @return {Promise<void>}
 */
export async function updateSite({ commit }, { id, delta }) {
    await axios()
        .put(GET_SITE_BY_ID_URL(id), delta);

    commit({ type: UPDATE_SITE, id: id, delta });
}

/**
 * Fetch latest audites sites
 * @param {function} commit
 * @return {Promise<T>}
 */
export async function getLatestSites({ commit }) {
    const { data } = await axios().get(GET_LATEST_AUDITED_SITES_URL);
    commit({ type: SET_LATEST_SITES, sites: data });
    return data;
}

/**
 * Get specific site
 * @param {object} _
 * @param {string} siteId
 * @return {Promise<Sites.SiteConfig>}
 */
export async function getSite(_, { siteId }) {
    const { data } = await axios().get(GET_SITE_BY_ID_URL(siteId));
    return data;
}

/**
 * Get specific site
 * @param {function} commit
 * @param {string} siteId
 * @return {Promise<Sites.SiteConfig>}
 */
export async function getCurrentSite({ commit }, { siteId }) {
    const { data } = await axios().get(GET_SITE_BY_ID_URL(siteId));
    commit({ type: SET_CURRENT_SITE_CONFIG, config: data });
    return data;
}

/**
 * Get sites with corresponsing latest report
 * @return {Promise<Sites.SiteWithReport[]>}
 */
export async function getSitesWithLatestReport() {
    const { data } = await axios().get(GET_SITE_WITH_REPORT_URL);
    return data;
}

export function resetCurrentSite({ commit }) {
    commit({ type: SET_CURRENT_SITE_CONFIG, config: null });
}

/**
 * Get specific site
 * @return {Promise<T>}
 */
export async function createReportForAll() {
    await axios().post(POST_SITE_ALL_URL);
}

/**
 * Search for a page
 * @param {function} commit
 * @param {string} query
 * @return {Promise<void>}
 */
export async function searchForPages({ commit }, { query }) {
    const { data } = await axios().get(GET_SITES_URL, { params: { query } });
    commit({ type: SET_SITES, sites: data });
}

export function setSites({ commit }, { sites }) {
    commit({ type: SET_SITES, sites });
}
