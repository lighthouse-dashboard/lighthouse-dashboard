<template>
    <div ref="chart"></div>
</template>

<script>

    import bb from 'billboard.js';

    export default {
        props: {
            columns: {
                type: Array,
                required: true
            },

            categories: {
                type: Array,
                required: true
            },
            height: {
                type: Number,
                required: true,
                default: 340
            }
        },

        data() {
            return {};
        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                const config = {
                    data: {
                        columns: this.columns,
                        type: "bar",

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
                    legend: {
                        show: false
                    },
                    color: {
                        pattern: ["#607D8B", "#66bb6a"],
                    },
                    size: {
                        height: this.height
                    },
                    bindto: this.$refs.chart
                };

                bb.generate(config);

            }
        }
    };
</script>
