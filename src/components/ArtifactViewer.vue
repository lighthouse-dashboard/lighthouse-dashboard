<template>
    <div>
        <h6><a :href="url" target="_blank">{{url}}</a></h6>
        <div ref="chart"></div>
    </div>
</template>

<script>

    import bb from 'billboard.js';

    export default {
        props: {
            artifactUrl: {
                type: String,
                required: true
            },
        },

        data() {
            return {
                reportCategories: null,
                url: null,
                isLoaded: false
            };
        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                this.$circle.getArtifact(this.artifactUrl)
                    .then(data => {
                        this.isLoaded = true;

                        const { budget, categories } = data;
                        if (!categories) {
                            return;
                        }

                        this.url = data.url;
                        const shrinkedCategories = categories.map((item) => {
                            return item.score;
                        });

                        const shrinkedBudget = categories.map((item) => {
                            return budget[item.id] ? budget[item.id] : null;
                        });

                        const categoryNames = categories.map((item) => {
                            return item.name;
                        });

                        const config = {
                            data: {
                                columns: [
                                    ['Report', ...shrinkedCategories],
                                    ['Budget', ...shrinkedBudget],
                                ],
                                type: "line",
                                types: {
                                    Budget: "area",
                                },
                                labels: true
                            },
                            axis: {
                                x: {
                                    type: "category",
                                    categories: categoryNames
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
                                height: 340
                            },
                            bindto: this.$refs.chart
                        };

                        bb.generate(config);
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                    })
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
