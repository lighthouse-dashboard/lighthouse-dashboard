import {
    ADD_SITE,
    SET_CURRENT_SITE_CONFIG,
    SET_LATEST_SITES,
    SET_SEARCH_RESULT,
    SET_SITES,
    UPDATE_SITE,
} from '../mutation-types';

export default {
    /**
     * Set sites
     * @param {SitesState} state
     * @param {Sites.SiteModel[]} sites
     */
    [SET_SITES](state, { sites }) {
        state.sites = sites;
    },

    /**
     * Add site
     * @param {SitesState} state
     * @param {Sites.SiteModel} site
     */
    [ADD_SITE](state, { site }) {
        state.sites.push(site);
    },

    /**
     * Set search result
     * @param {SitesState} state
     * @param {Sites.SiteModel[]} sites
     */
    [SET_SEARCH_RESULT](state, { sites }) {
        state.searchResult = sites;
    },

    /**
     * Set current site config
     * @param {SitesState} state
     * @param {Sites.SiteModel} config
     */
    [SET_CURRENT_SITE_CONFIG](state, { config }) {
        state.currentSiteConfig = config;
    },

    [SET_LATEST_SITES](state, { latestSites }) {
        state.latestSites = latestSites;
    },

    /**
     * Update site config
     * @param {SitesState} state
     * @param {string} id
     * @param {Partial<Sites.SiteModel> }delta
     */
    [UPDATE_SITE](state, { id, delta }) {
        state.sites = state.sites.map((site) => {
            if (site.id === id) {
                return {
                    ...site,
                    ...delta,
                };
            }
            return site;
        });
    },
};
