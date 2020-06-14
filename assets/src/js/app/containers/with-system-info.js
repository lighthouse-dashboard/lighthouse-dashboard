import Vue from 'vue';
import { mapActions } from 'vuex';
import { createElementProps } from './utils/create-element-props';

const withSystemInfo = (component) => {
    return Vue.component('WithSystemInfo', {
        data() {
            return {
                info: null,
                isLoading: false,
            };
        },

        methods: {
            ...mapActions('system', ['fetchInfo']),
            loadData() {
                this.isLoading = true;
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
                isLoading: this.isLoading,
            };

            return createElement(component, createElementProps(props, this));
        },
    });
};

export default withSystemInfo;
