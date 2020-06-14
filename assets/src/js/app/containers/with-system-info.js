import Vue from 'vue';
import { mapActions } from 'vuex';

const withSystemInfo = (component) => {
    return Vue.component('WithSystemInfo', {
        data() {
            return {
                info: null,
            };
        },

        methods: {
            ...mapActions('system', ['fetchInfo']),
            loadData() {
                return this.fetchInfo()
                    .then((info) => {
                        this.info = info;
                    })
                    .finally(() => {
                        this.isLoading = false;
                    });
            },
        },

        mounted() {
            this.loadData();
        },

        render(createElement) {
            const props = {
                info: this.info,
            };

            return createElement(component, createElement(props, this));
        },
    });
};

export default withSystemInfo;
