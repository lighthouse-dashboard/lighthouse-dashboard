import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

const withFavoritedSites = (component) => {
    return Vue.component('WithFavoritedSitesContainer', {
        computed: {
            ...mapGetters('sites', ['favoritedSites']),
        },
        methods: {
            ...mapActions('sites', ['fetchAllSites']),
        },
        mounted() {
            this.fetchAllSites();
        },
        render(createElement) {
            return createElement(component, {
                props: {
                    sites: this.favoritedSites,
                },
            });
        },
    });
};

export default withFavoritedSites;
