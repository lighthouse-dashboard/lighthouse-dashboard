<template>
    <div v-if="build" class="row">
        <div class="col s6 m3">
            <router-link
                lass="center"
                :to="{name: 'overview', params: {vcs, username, project}, query: $route.query}">
                {{ project }}
            </router-link>
        </div>
        <div class="col s6 m3">#{{build.build_num}}</div>
        <div class="col s6 m3">{{ buildCompletedTime }}</div>
        <div class="col s6 m3">by {{user.login}}</div>
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
            };
        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                this.$circle.getBuildInfo(this.vcs, this.username, this.project, false, this.$route.query.branch)
                    .then((build) => {
                        this.build = build;

                        const {
                            stop_time,
                            status,
                            user
                        } = this.build;

                        const classMap = {
                            'success': 'green lighten-4',
                            'fixed': 'green lighten-4',
                            'failed': 'red lighten-4',
                        };

                        this.buildStatusClass = classMap[status] || null;

                        const mStopTime = moment(stop_time);
                        const now = moment();
                        if (now.diff(mStopTime, 'hours') < 12) {
                            this.buildCompletedTime = mStopTime.fromNow();
                        } else {
                            this.buildCompletedTime = mStopTime.format(Vue.config.dateFormat);
                        }

                        this.user = user;
                    });
            }
        }
    };
</script>
