import Vue from 'vue';
import { fetchHealth } from '../api/health-api';
import { createElementProps } from './utils/create-element-props';

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

            return createElement(component, createElementProps(props, this));
        },
    });
};

export default withHealth;
