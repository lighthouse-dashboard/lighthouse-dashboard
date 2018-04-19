<template>
    <div>
        <div class="row" v-for="(report, trend) in trendScores" :key="trend">
            <div>{{trend}}</div>
            <div v-for="category in categories"
                 :key="category"
                 class="col s12 m2">
                <TrendCard
                    :vcs="vcs"
                    :username="username"
                    :project="project"
                    :trendScore="report.trend[category]"
                    :buildScore="report.build[category]"
                    :category="category"
                />
            </div>
        </div>
    </div>
</template>

<script>

    import TrendCard from '@/components/trend/TrendCard';

    export default {
        components: {
            TrendCard,
        },
        props: {

            vcs: {
                type: String,
                required: true
            },

            username: {
                type: String,
                required: true
            },

            project: {
                type: String,
                required: true
            },
        },

        data() {
            return {
                trendScores: {},
                categories: [
                    'performance',
                    'pwa',
                    'accessibility',
                    'best-practices',
                    'seo',
                    'dreipol'
                ]
            }
        },
        mounted() {
            this.$circle.getProjectTrend(this.vcs, this.username, this.project, this.$route.query.branch)
                .then((trend) => {
                    this.trendScores = trend;
                })
        }

    };
</script>
