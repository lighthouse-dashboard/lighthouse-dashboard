<template>
    <div class="row">
        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <div class="card-title">{{ $t('message.last_build_screenshots') }}</div>
                    <dreiguard-images
                        :vcs="vcs"
                        :username="username"
                        :project="project"
                    />
                </div>
            </div>
        </div>

        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <div class="card-title">{{ $t('message.all_builds_trend') }}</div>
                    <trend-chart
                        :vcs="vcs"
                        :username="username"
                        :project="project"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CiLink from '@/components/links/ci';
    import GitHubLink from '@/components/links/github';
    import TrendScoreTable from '@/components/trend-score-table';
    import TrendChart from '@/components/trend-chart-table';
    import DreiguardImages from '@/components/dreiguard-images';

    export default {

        components: {
            CiLink,
            GitHubLink,
            TrendScoreTable,
            TrendChart,
            DreiguardImages,
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
