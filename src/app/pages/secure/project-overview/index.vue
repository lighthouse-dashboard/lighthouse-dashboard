<template>
    <div>
        <div class="row">
            <div class="col s12">
                <h4>{{ $t('message.last_build_trends') }}</h4>
            </div>
            <div class="col s12">
                <trend-score-table
                    :vcs="vcs"
                    :username="username"
                    :project="project"
                />
            </div>
        </div>

        <div class="row">
            <div class="col s12">
                <h4>{{ $t('message.all_builds_trend') }}</h4>
            </div>

            <div class="col s12">
                <trend-chart
                    :vcs="vcs"
                    :username="username"
                    :project="project"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import CiLink from '@/components/links/ci';
    import GitHubLink from '@/components/links/github';
    import TrendScoreTable from '@/components/trend-score-table';
    import TrendChart from '@/components/trend-chart-table';

    export default {

        components: {
            CiLink,
            GitHubLink,
            TrendScoreTable,
            TrendChart,
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
            return {};
        },

    };
</script>
