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

            showlegend: {
                type: Boolean,
                default: true,
            },
            showx: {
                type: Boolean,
                default: false,
            },
            showy: {
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
                            show: this.showx,
                            type: 'category',
                            categories: this.categories,
                        },
                        y: {
                            show: this.showy,
                            label: 'Score',
                            max: 1,
                        },
                    },
                    legend: {
                        show: this.showlegend,
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
