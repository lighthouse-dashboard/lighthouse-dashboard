<template>
    <div>
        <h6>
            <a :href="pageUrl" target="_blank">{{pageUrl}}</a>
            <a class="right" :href="url" target="_blank">{{path}}</a>
        </h6>

        <div ref="chart"></div>
    </div>
</template>

<script>

    import bb from 'billboard.js';


    export default {
        components: {},

        props: {
            url: {
                type: String,
                required: true
            },

            path: {
                type: String,
                required: true
            },
        },

        data() {
            return {
                columns: null,
                pageUrl: null,
                categories: null
            };
        },

        mounted() {
            this.load()
                .then(() => {
                    this.createChart()
                })
        },

        methods: {
            load() {
                return this.$circle.getArtifact(this.url)
                    .then(data => {
                        const { budget, categories } = data;
                        if (!categories) {
                            return;
                        }

                        this.pageUrl = data.url;
                        const shrinkedCategories = categories.map((item) => {
                            return item.score;
                        });

                        const shrinkedBudget = categories.map((item) => {
                            return budget[item.id] ? budget[item.id] : null;
                        });

                        this.categories = categories.map((item) => {
                            return item.name;
                        });

                        this.columns = [
                            ['Report', ...shrinkedCategories],
                            ['Budget', ...shrinkedBudget],
                        ]
                    })
            },

            createChart() {
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
                        height: 340
                    },
                    bindto: this.$refs.chart
                };

                return bb.generate(config);
            }
        }
    }
</script>

<style scoped>
    iframe {
        border: none;
        width: 100%;
        height: 420px;
    }
</style>
