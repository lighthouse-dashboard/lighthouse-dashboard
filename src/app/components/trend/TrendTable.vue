<template>
    <table class="trend-table striped centered">
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
</template>

<script>

    import Score from '@/components/trend/Score';

    export default {
        components: {
            Score,
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
            this.$api.getProjectTrend(this.vcs, this.username, this.project, this.$route.query.branch)
                .then((trend) => {
                    this.trendScores = trend;
                });
        },
    };
</script>
