import {
    CREATE_SITE_URL,
    GET_LATEST_AUDITED_SITES_URL,
    GET_SITE_BY_ID_URL,
    GET_SITE_WITH_REPORT_URL,
    GET_SITES_URL,
    REMOVE_SITE_URL
} from '../config/routes';
import axios from '../utils/axios';

export const getAllSites = async () => {
    const { data } = await axios().get(GET_SITES_URL);
    return data;
}

/**
 *
 * @param {string} id
 * @return {Promise<void>}
 */
export const deleteSite = async (id) => {
    await axios().delete(REMOVE_SITE_URL(id));
}

/**
 *
 * @param {string}id
 * @param {Partial<Sites.SiteConfig>}delta
 * @return {Promise<void>}
 */
export const updateSite = async (id, delta) => {
    await axios()
        .put(GET_SITE_BY_ID_URL(id), delta);
}

/**
 *
 * @param {Sites.SiteConfig} config
 * @return {Promise<Sites.SiteConfig>}
 */
export const createSite = async (config) => {
    const { data } = await axios()
        .post(CREATE_SITE_URL, config);
    return data;
}

/**
 *
 * @return {Promise<{Sites.SiteConfig[]}>}
 */
export const getLatestSites = async () => {
    const { data } = await axios().get(GET_LATEST_AUDITED_SITES_URL);
    return data;
}

/**
 *
 * @param {string} id
 * @return {Promise<{Sites.SiteConfig}>}
 */
export const getSite = async (id) => {
    const { data } = await axios().get(GET_SITE_BY_ID_URL(id));
    return data;
}

/**
 *
 * @return {Promise<{Sites.SiteWithReport[]}>}
 */
export const getSitesWithLatestReport = async () => {
    const { data } = await axios().get(GET_SITE_WITH_REPORT_URL);
    return data;
}

/**
 *
 * @param {string} query
 * @return {Promise<{Sites.SiteConfig[]}>}
 */
export const search = async (query) => {
    const { data } = await axios().get(GET_SITES_URL, { params: { query } });
    return data;
}
