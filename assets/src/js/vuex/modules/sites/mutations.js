import { ADD_SITE, SET_SITES, UPDATE_SITE } from '../mutation-types';

export default {
    /**
     *
     * @param state
     * @param {SiteConfig[]} sites
     */
    [SET_SITES](state, { sites }) {
        state.sites = sites;
    },

    /**
     *
     * @param state
     * @param {SiteConfig} site
     */
    [ADD_SITE](state, { site }) {
        state.sites.push(site);
    },

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
