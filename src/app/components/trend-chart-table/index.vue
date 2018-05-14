<template>
    <div class="row">
        <div v-if="!isLoaded">
            <loader/>
        </div>

        <div v-for="(report, trend, index) in trendScores" :key="trend">
            <div class="col s12 " :class="{'grey lighten-5': index%2}">
                <div class="row">
                    <div class="col s12">
                        <h5>
                            <small>{{ report.tag }}</small>
                            <a target="_blank" :href="report.url">{{ report.url }}</a>
                        </h5>
                    </div>
                </div>

                <div class="row">
                    <div class="col s6 m4 l3" v-for="category in categories" :key="category">
                        <div class="card">
                            <div class="card-panel"
                                 :class="{'red lighten-5': report.trend[category] < 0, 'green lighten-5': report.trend[category] > 0}">
                                <span class="card-title truncate">
                                    {{ $t(`message.category_${category}`) }}
                                     <score
                                         :vcs="vcs"
                                         :username="username"
                                         :project="project"
                                         :trendscore="report.trend[category]"
                                         :buildscore="report.build[category]"
                                         :budgetscore="report.budget[category]"
                                         :category="category"
                                     />
                                </span>

                                <chart
                                    type="line"
                                    :height="50"
                                    :columns="[ [category, ...report.series[category]]]"
                                    :categories="report.categories"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
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
