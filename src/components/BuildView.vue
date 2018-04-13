<template>
    <div>
        <p v-if="!artifacts">{{ $t("message.no_dashboard_available") }}</p>
        <div v-for="(data, key) in chartData" :key="key">
            <h5><a :href="key" target="_blank">{{key}}</a></h5>
            <BuildChart :columns="data.columns" :categories="categories"/>
        </div>
    </div>
</template>

<script>
    import ArtifactViewer from "./ArtifactViewer";

    import BuildChart from '@/components/BuildChart.vue';

    export default {
        components: {
            ArtifactViewer,
            BuildChart,
        },

        props: {
            artifacts: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                chartData: null,
                categories: null,
            };
        },

        mounted() {
            const p = [];

            this.artifacts.forEach((item) => {
                p.push(this.$circle.getArtifact(item.url)
                    .then((result) => {
                        return result;
                    }))
            });

            Promise.all(p)
                .then((artifacts) => {
                    const endpoints = {};

                    artifacts.forEach((item) => {
                        if (!endpoints[item.url]) {
                            endpoints[item.url] = [];
                        }

                        endpoints[item.url].push(item);
                    });

                    return endpoints;
                })
                .then((data) => {
                    const keys = Object.keys(data);
                    const result = {};

                    keys.forEach((key) => {
                        const reports = data[key];
                        if (!result[key]) {
                            result[key] = { columns: [] };
                        }

                        reports.forEach((item) => {
                            const { budget, categories, url, tag } = item;
                            if (!categories) {
                                return;
                            }

                            const shrinkedCategories = categories.map((item) => {
                                return item.score;
                            });

                            const shrinkedBudget = categories.map((item) => {
                                return budget[item.id] ? budget[item.id] : null;
                            });

                            this.categories = categories.map((item) => {
                                return item.name;
                            });

                            result[key].columns.push(
                                [`Report ${tag ? tag : ''}`, ...shrinkedCategories],
                                [`Budget ${tag ? tag : ''}`, ...shrinkedBudget],
                            );
                        })
                    });

                    this.chartData = result;
                });
        }

    };
</script>
