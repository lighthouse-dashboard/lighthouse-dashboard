<template>
    <div class="row">
        <div v-if="!isLoaded">
            <loader/>
        </div>

        <div v-for="(report, trend, index) in trendScores" :key="trend">
            <div class="col s12 " :class="{'grey lighten-5': index%2}">
                <div>
                    <h5>
                        <small>{{ report.tag }}</small>
                        <a target="_blank" class="center" :href="report.url">{{ report.url }}</a>
                    </h5>
                </div>

                <div class="row">
                    <div class="col s6 m4 l3"
                         v-for="category in categories"
                         :key="category">
                        <div class="card">
                            <div class="card-panel "
                                 :class="getCardColor(report.build[category], report.budget[category])">
                                <span class="card-title truncate">
                                    {{ $t(`message.category_${category}`) }}
                                     <score
                                         :vcs="vcs"
                                         :username="username"
                                         :project="project"
                                         :buildscore="report.build[category] || 0"
                                         :budgetscore="report.budget[category] || 0"
                                         :category="category"
                                     />
                                </span>

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
