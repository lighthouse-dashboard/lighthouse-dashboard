import Vue from 'vue';
import { mapActions } from 'vuex';

const withReports = (Component) => {
    return Vue.component('WithReportsContainer', {
        inheritAttrs: true,

        props: {
            id: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                reports: [],
                isLoading: false,
            };
        },

        methods: {
            ...mapActions('reports', ['fetchReportsForSite']),

            loadData() {
                this.isLoading = true;
                return this.fetchReportsForSite({ id: this.id })
                    .then((reports) => {
                        this.reports = reports;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },

        mounted() {
            this.loadData();
        },

        render(h,) {
            const props = {
                reports: this.reports,
                isLoading: this.isLoading,
            };

            return h(
                Component,
                {
                    attrs: {
                        ...this.$attrs,
                        ...props,
                    },
                    props: {
                        ...this.$props,
                        ...props,
                    },

                    on: this.$listeners,
                }
            );
        },
    });
};

export default withReports;
