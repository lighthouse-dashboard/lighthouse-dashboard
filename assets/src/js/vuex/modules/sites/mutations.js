import { SET_SITES, UPDATE_SITE } from '../mutation-types';

export default {
    /**
     *
     * @param state
     * @param {SiteConfig[]} sites
     */
    [SET_SITES](state, { sites }) {
        state.sites = sites;
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
