import { ADD_SITE, SET_CURRENT_SITE_CONFIG, SET_SEARCH_RESULT, SET_SITES, UPDATE_SITE } from '../mutation-types';

export default {
    /**
     * Set sites
     * @param {object} state
     * @param {SiteConfig[]} sites
     */
    [SET_SITES](state, { sites }) {
        state.sites = sites;
    },

    /**
     * Add site
     * @param {object} state
     * @param {SiteConfig} site
     */
    [ADD_SITE](state, { site }) {
        state.sites.push(site);
    },

    /**
     * Set search result
     * @param {object} state
     * @param {SiteConfig[]} sites
     */
    [SET_SEARCH_RESULT](state, { sites }) {
        state.searchResult = sites;
    },

    /**
     * Set current site config
     * @param {object} state
     * @param {SiteConfig} config
     */
    [SET_CURRENT_SITE_CONFIG](state, { config }) {
        state.currentSiteConfig = config;
    },

    /**
     * Update site config
     * @param {config} state
     * @param {string} id
     * @param {Partial<SiteConfig> }delta
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
