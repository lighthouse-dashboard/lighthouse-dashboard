<template>
    <div class="row" v-if="build">
        <div class="col s12 xl6">
            <Card>
                <span slot="title">Project</span>

                <router-link
                    :to="{name: 'overview', params: {vcs, username, project}, query: $route.query}">
                    <build-status
                        :vcs="vcs"
                        :username="username"
                        :project="project"
                        :buildNum="buildNum"/>
                    {{ project }}
                </router-link>

                <pineapple class="right" v-if="hasReachedBudget" :size="45"/>
            </Card>
        </div>

        <div class="col s12 xl6">
            <built-at :stopTime="build.stop_time"/>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    import BuildStatus from '@/components/BuildStatus';
    import BuildNum from '@/components/cards/BuildNum';
    import Author from '@/components/cards/Author';
    import BuiltAt from '@/components/cards/BuiltAt';
    import Card from '@/components/cards/Card';
    import Pineapple from '@/components/HappyPineapple';


    export default {
        components: {
            BuildStatus,
            BuildNum,
            Author,
            BuiltAt,
            Card,
            Pineapple,
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
                branch: null,
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
                    .getBuildInfo(this.vcs, this.username, this.project, this.buildNum, this.$route.query.branch)
                    .then((build) => {
                        this.build = build;

                        const {
                            user
                        } = this.build;

                        this.user = user;
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
