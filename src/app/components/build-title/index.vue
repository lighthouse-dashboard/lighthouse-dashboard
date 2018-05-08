<template>
    <div class="build-title " v-if="build">
        <div class="row">
            <div class="col s6 m3">
                <div>
                    <h5 v-if="build">
                        <built-at :stopTime="build.stop_time"/>
                    </h5>
                </div>
                <div>
                    <h5>
                        <build-status
                            :vcs="vcs"
                            :username="username"
                            :project="project"
                            :buildnum="buildnum"/>
                        <router-link :to="{name: 'buildinfo', params: {vcs, username, project, buildnum}}">
                            #{{ buildnum }}
                        </router-link>
                    </h5>
                </div>
            </div>

            <div class="build-title__cell col s12 m6">
                <commit-detail
                    v-if="build"
                    :useravatar="build.user.avatar_url"
                    :username="build.user.name"
                    :commitmessage="build.subject"
                />
            </div>

            <div class="col s6 m2">
                <dreiguard-whitepage-alert
                    :vcs="vcs"
                    :username="username"
                    :project="project"
                    :buildnum="buildnum"
                />

                <dreiguard-diff-alert
                    :vcs="vcs"
                    :username="username"
                    :project="project"
                    :buildnum="buildnum"
                />
            </div>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue';

    import BuildStatus from '@/components/build-status';
    import BuiltAt from '@/components/built-at';
    import CommitDetail from '@/components/commit-detail';
    import Pineapple from '@/components/happy-pineapple';
    import DreiguardWhitepageAlert from '@/components/dreiguard-whitepage-alert';
    import DreiguardDiffAlert from '@/components/dreiguard-diff-alert';


    export default {
        components: {
            BuildStatus,
            BuiltAt,
            Pineapple,
            CommitDetail,

            DreiguardWhitepageAlert,
            DreiguardDiffAlert,
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

            buildnum: {
                type: Number,
                required: true,
            },
        },

        data() {
            return {
                user: null,
                htmlArtifacts: [],
                buildCompletedTime: null,
                buildDuration: null,
                buildStatusClass: null,
                isBuildSuccessful: null,
                build: null,
                updater: null,
                hasRunningBuild: null,
                hasReachedBudget: null,
            };
        },

        computed: {},

        methods: {
            load() {
                return this.$api
                    .getBuildInfo(this.vcs, this.username, this.project, this.buildnum)
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
            this.load();
        },
    };
</script>
