<template>
    <div>
        <h6>{{url}}</h6>
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
                score: null
            };
        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                this.$circle.getArtifact(this.artifactUrl)
                    .then(data => {

                        const { budget, categories } = data;
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

                        const options = {
                            data: {
                                columns: [
                                    ['Report', ...shrinkedCategories],
                                    ['Budget', ...shrinkedBudget],
                                ],
                                type: "bar",
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

                        bb.generate(options);
                        console.log(data);
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
