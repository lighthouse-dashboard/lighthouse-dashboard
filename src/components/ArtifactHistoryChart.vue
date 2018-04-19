<template>
    <div ref="chart"/>
</template>

<script>

    import bb from 'billboard.js';

    export default {
        props: {
            data: {
                type: Object,
                required: true,
            },

            categories: {
                type: Array,
                required: true,
            },

            height: {
                type: Number,
                default: 380,
            },

            showLegend: {
                type: Boolean,
                default: true,
            },
            showX: {
                type: Boolean,
                default: false,
            },
            showY: {
                type: Boolean,
                default: false,
            },

        },

        methods: {
            load() {
                const options = {
                    data: {
                        json: this.data,
                        type: 'line',
                        labels: true,
                    },
                    axis: {
                        x: {
                            show: this.showX,
                            type: 'category',
                            categories: this.categories,
                        },
                        y: {
                            show: this.showY,
                            label: 'Score',
                            max: 100,
                        },
                    },
                    legend: {
                        show: this.showLegend,
                    },
                    size: {
                        height: this.height,
                    },
                    bindto: this.$refs.chart,
                };

                bb.generate(options);
            },
        },

        mounted() {
            this.load();
        },
    };
</script>
