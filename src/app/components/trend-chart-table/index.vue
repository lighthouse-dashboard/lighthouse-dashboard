<template>
    <div class="row">
        <div v-if="!isLoaded">
            <loader/>
        </div>

        <div class="col s12" v-for="(report, trend) in trendScores" :key="trend">
            <div>
                <h5 class="center">{{ trend }}</h5>
            </div>

            <table class="trend-table striped centered">
                <tbody>
                <tr>
                    <td v-for="category in categories"
                        :key="category">
                        {{ $t(`message.category_${category}`) }}
                    </td>
                </tr>
                </tbody>

                <tbody>
                <tr>
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

                        <chart
                            type="line"
                            :height="50"
                            :width="150"
                            :columns="[ [category, ...report.series[category]]]"
                            :categories="report.categories"
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
    import { mapGetters } from 'vuex';

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
                isLoaded: false,
                trendScores: null,
                updater: null,
                categories: Vue.config.reportCategories,
            };
        },


        computed: {
            ...mapGetters({
                branch: 'branch',
            }),
        },

        methods: {
            load() {
                this.isLoaded = false;

                this.$api.getProjectTrend(this.vcs, this.username, this.project, this.branch)
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
