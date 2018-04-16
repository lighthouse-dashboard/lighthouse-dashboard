<template>
    <div v-if="build" class="row">
        <div class="col s6 m3">
            <div class="card" :class="buildStatusClass">
                <div class="card-content">
                    <small>Project</small>
                    <div class="card-title">
                        <router-link
                            lass="center"
                            :to="{name: 'overview', params: {vcs, username, project}, query: $route.query}">
                            {{ project }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="col s6 m3">
            <div class="card">
                <div class="card-content">
                    <small>Build</small>
                    <div class="card-title">
                        #{{build.build_num}}
                    </div>

                </div>
            </div>
        </div>
        <div class="col s6 m3">
            <div class="card">
                <div class="card-content">
                    <small>Completed</small>
                    <div class="card-title">
                        {{ buildCompletedAt }}
                    </div>

                </div>
            </div>
        </div>
        <div class="col s6 m3">
            <div class="card">
                <div class="card-content">
                    <small>User</small>
                    <div class="card-title">
                        {{user.login}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';

    export default {

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
                build: null,
                updater: null,
                hasRunningBuild: null,
            };
        },

        computed: {
            buildCompletedAt() {
                const {
                    stop_time,
                } = this.build;

                const mStopTime = moment(stop_time);
                const now = moment();
                if (now.diff(mStopTime, 'hours') < 12) {
                    return mStopTime.fromNow();
                } else {
                    return mStopTime.format(Vue.config.dateFormat);
                }
            }
        },

        beforeDestroy() {
            if (this.updater) {
                clearTimeout(this.updater);
            }
        },

        mounted() {
            this.load()
                .then(() => {

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
                            status,
                            user
                        } = this.build;

                        const classMap = {
                            'success': 'green lighten-4',
                            'fixed': 'green lighten-4',
                            'failed': 'red lighten-4',
                        };

                        this.buildStatusClass = classMap[status] || null;

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
            }
        }
    };
</script>
