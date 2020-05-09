import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

const withSites = (component) => {
    return Vue.component('WithSitesContainer', {
        render(createElement) {
            return createElement(component, {
                props: {
                    sites: this.sites,
                },
            });
        },

        computed: {
            ...mapState('sites', ['sites']),
        },

        methods: {
            ...mapActions('sites', ['fetchAllSites'])
        },

        mounted() {
            this.fetchAllSites();
        },
    });
};

export default withSites;
