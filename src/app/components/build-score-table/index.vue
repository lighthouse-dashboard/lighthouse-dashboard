<template>
    <div class="build-score-table row">
        <div v-if="!isLoaded">
            <loader/>
        </div>

        <div v-for="(report, trend, index) in trendScores" :key="trend">
            <div class="col s12 l6" :class="{'grey lighten-5': index%2}">
                <div>
                    <span class="new badge" :data-badge-caption="report.tag"></span>
                    <h5>
                        <a target="_blank" class="center" :href="report.url">{{ report.url }}</a>
                    </h5>
                </div>

                <div class="row">
                    <div class="col s12">
                        <table>
                            <tr
                                v-for="category in categories"
                                :key="category"
                                v-if="report.build[category]"
                                :class="{'red lighten-5': report.trend[category] < 0, 'green lighten-5': report.trend[category] > 0}">
                                <td>
                                    {{ $t(`message.category_${category}`) }}
                                </td>
                                <td>
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
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import { mapGetters } from 'vuex';

    import Score from '@/components/build-score';
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

        computed: {
            ...mapGetters({
                branch: 'branch',
            }),
        },

        methods: {
            getCardColor(buildscore = 0, budgetscore = 0) {
                if (!budgetscore) {
                    return '';
                }

                if (buildscore >= budgetscore) {
                    return 'green lighten-5';
                }

                if (buildscore < budgetscore) {
                    return 'red lighten-5';
                }
                return '';
            },
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
