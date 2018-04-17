<template>
    <div v-if="build" class="row">
        <div class="col s12 m2 xl1" v-if="hasReachedBudget">
            <Card>
                <Pineapple :size="45"/>
            </Card>
        </div>

        <div class="col s12 m10 xl3">
            <Card>
                <span slot="title">Project</span>
                <router-link
                    :to="{name: 'overview', params: {vcs, username, project}, query: $route.query}">
                    <BuildStatus :vcs="vcs" :username="username" :project="project" :buildNum="buildNum"/>
                    {{ project }}
                </router-link>
            </Card>
        </div>

        <div class="col s12 m3 xl2" :class="{'m3 xl2': hasReachedBudget,'m4 xl3': !hasReachedBudget }">
            <BuildNum :buildNum="build.build_num"/>
        </div>

        <div class="col s12 m5 xl3">
            <Author :username="user.login" :avatar="user.avatar_url"/>
        </div>

        <div class="col s12 m4 xl3">
            <BuiltAt :stopTime="build.stop_time"/>
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
    import Pineapple from '@/components/happyPineapple';


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

            buildNum: {
                type: Number,
                required: true
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

        beforeDestroy() {
            if (this.updater) {
                clearTimeout(this.updater);
            }
        },

        mounted() {
            this.load()
                .then(() => {
                    this.$circle.hasAllartifactsReachedBudget(this.vcs, this.username, this.project, this.buildNum)
                        .then((has) => {
                            this.hasReachedBudget = has;
                        })
                })
        },

        methods: {
            checkIfIsRunning() {
                return this.$circle.hasRunningBuild(this.vcs, this.username, this.project, this.$route.query.branch)
                    .then((has) => {
                        this.hasRunningBuild = has;
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                        if (e.status === 401) {
                            this.$auth.logout();
                            this.$router.push({ name: 'login' });
                        }
                    });
            },
            load() {
                return this.$circle.getBuildInfo(this.vcs, this.username, this.project, this.buildNum, this.$route.query.branch)
                    .then((build) => {
                        this.build = build;

                        const {
                            user
                        } = this.build;

                        this.user = user;
                    })
                    .then(() => {
                        return this.checkIfIsRunning();
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
            }
        }
    };
</script>
