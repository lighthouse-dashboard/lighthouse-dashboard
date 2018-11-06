<template>
    <div ref="chart"/>
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
                required: false,
                default: 340,
            },

            width: {
                type: Number,
                required: false,
                default: null,
            },

            type: {
                type: String,
                required: false,
                default: 'line',
            },

            showx: {
                type: Boolean,
                required: false,
                default: false,
            },

            showy: {
                type: Boolean,
                required: false,
                default: false,
            },

            showlegend: {
                type: Boolean,
                required: false,
                default: false,
            },

            showlabels: {
                type: Boolean,
                required: false,
                default: false,
            },

            showpoint: {
                type: Boolean,
                required: false,
                default: false,
            },

            ylines: {
                type: Array,
                required: false,
                default: () => {
                    return [];
                },
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
                        type: this.type,
                        labels: this.showlabels,
                    },
                    axis: {
                        x: {
                            show: this.showx,
                            type: 'category',
                            categories: this.categories,
                        },
                        y: {
                            show: this.showy,
                            label: 'Score',
                            max: 1,
                            min: 0,
                            top: 0,
                            bottom: 0,
                        },
                    },
                    grid: {
                        y: {
                            lines: this.ylines,
                        },
                    },
                    legend: {
                        show: this.showlegend,
                    },
                    point: {
                        show: this.showpoint,
                    },
                    color: {
                        pattern: Vue.config.chartColors,
                    },
                    size: {
                        height: this.height,
                        width: this.width,
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
