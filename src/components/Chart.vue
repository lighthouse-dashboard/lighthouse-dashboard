<template>
    <div ref="chart" />
</template>

<script>

    import Vue from 'vue';
    import bb from 'billboard.js';

    export default {
        props: {
            columns: {
                type: Array,
                required: true,
            },

            categories: {
                type: Array,
                required: true,
            },
            height: {
                type: Number,
                required: true,
                default: 340,
            },
        },

        data() {
            return {};
        },

        methods: {
            load() {
                const config = {
                    data: {
                        columns: this.columns,
                        type: 'bar',
                        labels: true,
                    },
                    axis: {
                        x: {
                            type: 'category',
                            categories: this.categories,
                        },
                        y: {
                            show: false,
                            label: 'Score',
                            max: 100,
                            min: 0,
                            top: 0,
                            bottom: 0,
                        },
                    },
                    legend: {
                        show: false,
                    },
                    color: {
                        pattern: Vue.config.chartColors,
                    },
                    size: {
                        height: this.height,
                    },
                    bindto: this.$refs.chart,
                };

                bb.generate(config);
            },
        },

        mounted() {
            this.load();
        },

    };
</script>
