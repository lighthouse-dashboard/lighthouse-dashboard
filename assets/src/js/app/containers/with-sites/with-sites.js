import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

const withSites = (component) => {
    return Vue.component('WithSitesContainer', {
        computed: {
            ...mapState('sites', ['sites']),
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
                    sites: this.sites,
                },
            });
        },
    });
};

export default withSites;
