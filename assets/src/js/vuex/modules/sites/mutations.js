import { ADD_SITE, SET_SITES, UPDATE_SITE } from '../mutation-types';

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
