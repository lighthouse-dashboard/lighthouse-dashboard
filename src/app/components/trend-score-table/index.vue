<template>
    <div class="row">
        <div v-if="!isLoaded">
            <loader/>
        </div>

        <div class="col s12">
            <table class="trend-table striped centered" v-if="trendScores">
                <tbody>
                <tr>
                    <td class="trend-table__title-cell"/>
                    <td v-for="category in categories"
                        :key="category">
                        {{ $t(`message.category_${category}`) }}
                    </td>
                </tr>
                </tbody>

                <tbody>
                <tr v-for="(report, trend) in trendScores" :key="trend">
                    <td class="trend-table__title-cell">
                        <p class="truncate" :title="trend">{{ trend }}</p>
                    </td>
                    <td v-for="category in categories"
                        :key="category">
                        <score
                            :vcs="vcs"
                            :username="username"
                            :project="project"
                            :trendscore="report.trend[category]"
                            :buildscore="report.build[category]"
                            :budgetscore="report.budget[category]"
                            :category="category"
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';

    import Score from '@/components/trend-score';
    import Chart from '@/components/chart';

    export default {
        components: {
            Score,
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
        },

        data() {
            return {
                trendScores: null,
                isLoaded: false,
                updater: null,
                categories: Vue.config.reportCategories,
            };
        },
        methods: {
            load() {
                this.isLoaded = false;

                this.$api.getProjectTrend(this.vcs, this.username, this.project, this.$route.query.branch)
                    .then((trend) => {
                        this.trendScores = trend;
                    })
                    .finally(() => {
                        this.isLoaded = true;
                        this.updater = setTimeout(() => {
                            this.load();
                        }, Vue.config.refreshInterval);
                    });
            },
        },

        watch: {
            username() {
                this.trendScores = null;
                this.load();
            },
            project() {
                this.trendScores = null;
                this.load();
            },
        },

        beforeDestroy() {
            clearTimeout(this.updater);
        },

        mounted() {
            this.load();
        },
    };
</script>
