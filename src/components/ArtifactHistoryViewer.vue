<template>
    <div>
        <div ref="chart"></div>
    </div>
</template>

<script>

    import bb from 'billboard.js';

    export default {
        props: {
            data: {
                type: Object,
                required: true
            },
            categories: {
                type: Array,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                const options = {
                    data: {
                        json: this.data,
                        type: "spline",
                        labels: true
                    },
                    axis: {
                        x: {
                            type: "category",
                            categories: this.categories
                        },
                        y: {
                            show: false,
                            label: "Score",
                            max: 100,
                            min: 0,
                            top: 0,
                            bottom: 0
                        }
                    },

                    size: {
                        height: 340
                    },
                    bindto: this.$refs.chart
                };

                bb.generate(options);
            }
        }
    };
</script>

<style scoped>
    iframe {
        border: none;
        width: 100%;
        height: 420px;
    }
</style>
