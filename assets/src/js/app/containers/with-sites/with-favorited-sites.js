import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';

const withFavoritedSites = (component) => {
    return Vue.component('WithFavoritedSitesContainer', {
        render(createElement) {
            return createElement(component, {
                props: {
                    sites: this.favoritedSites,
                },
            });
        },

        computed: {
            ...mapGetters('sites', ['favoritedSites']),
        },

        methods: {
            ...mapActions('sites', ['fetchAllSites'])
        },

        mounted() {
            this.fetchAllSites();
        },
    });
};

export default withFavoritedSites;
