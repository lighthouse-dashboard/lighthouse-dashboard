<template>
    <div>
        <table class="striped centered">
            <tbody>
            <tr>
                <td></td>
                <td v-for="category in categories"
                    :key="category">
                    {{ $t(`message.category_${category}`) }}
                </td>
            </tr>
            </tbody>

            <tbody>
            <tr v-for="(report, trend) in trendScores" :key="trend">
                <td>{{ trend }}</td>
                <td v-for="category in categories"
                    :key="category">
                    <TrendCard
                        :vcs="vcs"
                        :username="username"
                        :project="project"
                        :trendscore="report.trend[category]"
                        :buildscore="report.build[category]"
                        :category="category"
                    />
                </td>
            </tr>
            </tbody>
        </table>
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
                trendScores: {},
                categories: [
                    'performance',
                    'pwa',
                    'accessibility',
                    'best-practices',
                    'seo',
                    'dreipol',
                ],
            };
        },

        mounted() {
            this.$circle.getProjectTrend(this.vcs, this.username, this.project, this.$route.query.branch)
                .then((trend) => {
                    this.trendScores = trend;
                });
        },
    };
</script>
