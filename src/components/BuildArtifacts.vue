<template>
    <div class="card">
        <div class="card-content">
            <div class="row">
                <p class="center"
                   v-if="!artifacts || artifacts.length === 0">
                    {{ $t("message.no_dashboard_available") }}
                </p>

                <div class="col s12"
                     v-for="(data, key) in chartData"
                     :key="key">
                    <p>
                        <a target="_blank" :href="key">
                            {{ key }}
                        </a>
                    </p>

                    <chart
                        :columns="data.columns"
                        :categories="categories"
                        :height="height"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Chart from '@/components/Chart.vue';

    export default {
        components: {
            Chart,
        },

        props: {
            vcs: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            project: {
                type: String,
                required: true,
            },
            buildNum: {
                type: Number,
                required: true,
            },

            height: {
                type: Number,
                default: 340,
            },
        },

        data() {
            return {
                chartData: null,
                chartDataLength: null,
                categories: null,
                artifacts: null,
                computedClass: null,
            };
        },

        methods: {
            loadArtifacts() {
                return this.$circle
                    .getDashboardArtifacts(this.vcs, this.username, this.project, this.buildNum)
                    .then(artifacts => {
                        console.log(artifacts);
                        this.artifacts = artifacts.length > 0 ? artifacts : [];
                    });
            },

            buildChartData() {
                const p = [];

                this.artifacts.forEach((item) => {
                    p.push(this.$circle.getArtifact(item.url)
                        .then((result) => {
                            return result;
                        }));
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
                                const {
                                    budget, categories,
                                    tag
                                } = item;
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
                        this.chartDataLength = Object.keys(this.chartData).length;
                        this.computedClass = this.chartDataLength % 2 === 0 ? 'm6' : 'm12';
                    });
            },

            mounted() {
                this.loadArtifacts()
                    .then(() => {
                        return this.buildChartData();
                    });
            },
        },
    };
</script>
