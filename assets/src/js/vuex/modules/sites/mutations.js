import { ADD_SITE, SET_CURRENT_SITE_CONFIG, SET_SEARCH_RESULT, SET_SITES, UPDATE_SITE } from '../mutation-types';

export default {
    /**
     * Set sites
     * @param {SitesState} state
     * @param {Sites.SiteConfig[]} sites
     */
    [SET_SITES](state, { sites }) {
        state.sites = sites;
    },

    /**
     * Add site
     * @param {SitesState} state
     * @param {Sites.SiteConfig} site
     */
    [ADD_SITE](state, { site }) {
        state.sites.push(site);
    },

    /**
     * Set search result
     * @param {SitesState} state
     * @param {Sites.SiteConfig[]} sites
     */
    [SET_SEARCH_RESULT](state, { sites }) {
        state.searchResult = sites;
    },

    /**
     * Set current site config
     * @param {SitesState} state
     * @param {Sites.SiteConfig} config
     */
    [SET_CURRENT_SITE_CONFIG](state, { config }) {
        state.currentSiteConfig = config;
    },

    /**
     * Update site config
     * @param {SitesState} state
     * @param {string} id
     * @param {Partial<Sites.SiteConfig> }delta
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
