import {
    CREATE_SITE_URL,
    GET_LATEST_AUDITED_SITES_URL,
    GET_SITE_BY_ID_URL,
    GET_SITE_WITH_REPORT_URL,
    GET_SITES_URL,
    REMOVE_SITE_URL,
} from '../config/routes';
import axios from '../utils/axios';

/**
 * Get all available sites
 * @return {Promise<Sites.SiteConfig[]>}
 */
export const getAllSites = async () => {
    const { data } = await axios().get(GET_SITES_URL);
    return data;
};

/**
 * Delete a site
 * @param {string} id
 * @return {Promise<void>}
 */
export const deleteSite = async (id) => {
    await axios().delete(REMOVE_SITE_URL(id));
};

/**
 * Update a site
 * @param {string} id
 * @param {Partial<Sites.SiteConfig>}delta
 * @return {Promise<void>}
 */
export const updateSite = async (id, delta) => {
    await axios()
        .put(GET_SITE_BY_ID_URL(id), delta);
};

/**
 * Create a new site
 * @param {Sites.SiteConfig} config
 * @return {Promise<Sites.SiteConfig>}
 */
export async function createSite(config) {
    const { data } = await axios()
        .post(CREATE_SITE_URL, config);
    return data;
}

/**
 * Get latest audited sites *
 * @return {Promise<Sites.SiteConfig[]>}
 */
export const getLatestSites = async () => {
    const { data } = await axios().get(GET_LATEST_AUDITED_SITES_URL);
    return data;
};

/**
 * Get specific site
 * @param {string} id
 * @return {Promise<Sites.SiteConfig>}
 */
export const getSite = async (id) => {
    const { data } = await axios().get(GET_SITE_BY_ID_URL(id));
    return data;
};

/**
 * Get all sites with it's latest reports
 * @return {Promise<Sites.SiteWithReport[]>}
 */
export const getSitesWithLatestReport = async () => {
    const { data } = await axios().get(GET_SITE_WITH_REPORT_URL);
    return data;
};

/**
 * Search for site
 * @param {string} query
 * @return { Promise<Sites.SiteConfig[]> }
 */
export async function search(query) {
    const { data } = await axios().get(GET_SITES_URL, { params: { query } });
    return data;
}
