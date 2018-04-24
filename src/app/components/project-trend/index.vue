<template>
    <div>
            <project-title
                :vcs="vcs"
                :username="username"
                :project="project"
                :buildNum="buildNum"/>

        <div class="row">
            <div class="col s12">
                <trend-table
                    :vcs="vcs"
                    :username="username"
                    :project="project"
                />
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import ProjectTitle from '@/components/project-title';
    import BuildStatus from '@/components/build-status';
    import TrendTable from "@/components/trend/TrendTable";
    import BuiltAt from '@/components/built-at';
    import CommitDetail from '@/components/commit-detail';


    export default {

        components: {
            TrendTable,
            BuildStatus,
            BuiltAt,
            CommitDetail,
            ProjectTitle,
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
            buildNum: {
                type: Number,
                required: true,
            },
        },

        data() {
            return {
                build: null,
                updater: null,
            };
        },

        methods: {
            load() {
                return this.$api
                    .getBuildInfo(this.vcs, this.username, this.project, this.buildNum, this.$route.query.branch)
                    .then((build) => {
                        this.build = build;
                    })
                    .then(() => {
                        this.updater = setTimeout(() => {
                            this.load();
                        }, Vue.config.refreshInterval);
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                        if (e.status === 401) {
                            this.$auth.logout();
                            this.$router.push({ name: 'login' });
                        }
                    });
            },
        },

        beforeDestroy() {
            if (this.updater) {
                clearTimeout(this.updater);
            }
        },

        mounted() {
            this.load()
        },
    };
</script>
