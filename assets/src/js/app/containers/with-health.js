import Vue from 'vue';
import { fetchHealth } from '../api/health-api';

const withHealth = (component) => {
    return Vue.component('WithHealth', {
        data() {
            return {
                health: null,
            };
        },

        methods: {

            loadData() {
                return fetchHealth()
                    .then((health) => {
                        this.health = health;
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
                health: this.health,
            };

            return createElement(component, {
                attrs: {
                    ...this.$attrs,
                    ...props,
                },
                props: {
                    ...this.$props,
                    ...props,
                },
            });
        },
    });
};

export default withHealth;
