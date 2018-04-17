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

        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                const options = {
                    data: {
                        json: this.data,
                        type: "line",
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

                    bindto: this.$refs.chart
                };

                bb.generate(options);
            }
        }
    };
</script>
