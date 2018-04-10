<template>
    <div class="row" v-if="build">
        <h2 v-if="showTitle">
            <router-link :to="{name: 'project', params: project}">
                {{build.reponame}}
            </router-link>

        </h2>

        <div class="col s12 m6 l12">
            <ul class="collection">
                <li class="collection-item avatar">
                    <img :src="userAvatar" alt="" class="circle">
                    <b>User</b> {{user}}
                </li>

                <li class="collection-item">
                    <b>Commit</b> {{build.subject}}
                </li>

                <li class="collection-item">
                    <b>Branch</b> {{build.branch}}
                </li>

                <li class="collection-item">
                    <b>Build duration</b> {{ buildDuration }}
                </li>

                <li class="collection-item">
                    <b>Completed</b> {{ buildCompletedTime }}
                </li>

                <li class="collection-item">
                    <b>Build</b> #{{build.build_num}}
                </li>

                <li class="collection-item" :class="buildStatusClass">
                    <b>Status</b> {{build.status}}
                </li>

                <li class="collection-item">
                    <a :href="build.build_url" target="_blank">CircleCi</a>
                </li>

                <li class="collection-item">
                    <a :href="build.vcs_url" target="_blank">Repository</a>
                </li>
            </ul>
        </div>


        <div class="col s12 m6 l12">
            <div class="collection with-header">
                <div class="collection-header">
                    <h6>Artifacts</h6>
                </div>
                <a v-for='html in htmlArtifacts'
                   class="collection-item"
                   :key='html.url'
                   target='_blank'
                   :href='html.url'>
                    {{html.path}}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';

    export default {
        props: {

            project: {
                type: Object,
                required: true
            },
            build: {
                type: Object,
                required: true
            },

            showTitle: {
                type: Boolean,
                required: false,
                default: true
            }
        },

        data() {
            return {
                branch: null,
                user: null,
                userAvatar: null,
                htmlArtifacts: [],
                buildCompletedTime: null,
                buildDuration: null,
                buildStatusClass: null,
            };
        },

        mounted() {
            const {
                user,
                stop_time,
                build_time_millis,
                status,
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

            this.buildDuration = moment.duration(build_time_millis).humanize();

            this.user = user.login;
            this.userAvatar = user.avatar_url;

            this.$circle
                .getHtmlArtifacts(this.project, this.build.build_num)
                .then(htmlArtifacts => {
                    this.htmlArtifacts = htmlArtifacts;
                })
                .catch((e) => {
                    this.$toast.notify(e.message);
                })
        }
    };
</script>
