import {
    CREATE_SITE_URL,
    GET_LATEST_AUDITED_SITES_URL,
    GET_SITE_BY_ID_URL,
    GET_SITES_URL,
    REMOVE_SITE_URL
} from '../../../config/routes';
import axios from '../../../utils/axios';
import { ADD_SITE, SET_SITES, UPDATE_SITE } from '../mutation-types';

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
 * @param {any} _
 * @param {string} siteId
 */
export function deleteSite(_, { id }) {
    axios().delete(REMOVE_SITE_URL(id));
}

/**
 * Create a new site
 * @param {SiteConfig} siteConfig
 * @return {Promise<void>}
 */
export async function createSite({ commit }, siteConfig) {
    const { data } = await axios()
        .post(CREATE_SITE_URL, siteConfig);

    commit({ type: ADD_SITE, site: data });
}

/**
 * Update a site
 * @param _
 * @param {string} id
 * @param {Partial<SiteConfig>}delta
 * @return {Promise<void>}
 */
export async function updateSite({ commit }, { id, delta }) {
    await axios()
        .put(GET_SITE_BY_ID_URL(id), delta);

    commit({ type: UPDATE_SITE, id: id, delta });
}

/**
 * Fetch latest audites sites
 * @return {Promise<T>}
 */
export async function getLatestSites() {
    const { data } = await axios().get(GET_LATEST_AUDITED_SITES_URL);
    return data;
}

/**
 * Get specific site
 * @param _
 * @param {string} siteId
 * @return {Promise<T>}
 */
export async function getSite(_, { siteId }) {
    const { data } = await axios().get(GET_SITE_BY_ID_URL(siteId));
    return data;
}
