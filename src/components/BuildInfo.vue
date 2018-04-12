<template>
    <div class="row" v-if="build">
        <h2 v-if="showTitle">
            <router-link :to="{name: 'overview', params: project, query: $route.query}">
                {{build.reponame}}
            </router-link>

        </h2>

        <div class="col s12 m6 l12">
            <ul class="collection">
                <li class="collection-item avatar">
                    <img :src="userAvatar" alt="" class="circle">
                    <b>{{ $t("message.user") }}</b> {{user}}
                </li>

                <li class="collection-item">
                    <b>{{ $t("message.commit") }}</b> {{build.subject}}
                </li>

                <li class="collection-item">
                    <b>{{ $t("message.branch") }}</b> {{build.branch}}
                </li>

                <li class="collection-item">
                    <b>{{ $t("message.build_duration") }}</b> {{ buildDuration }}
                </li>

                <li class="collection-item">
                    <b>{{ $t("message.build_completed") }}</b> {{ buildCompletedTime }}
                </li>

                <li class="collection-item">
                    <b>{{ $t("message.build_num") }}</b> #{{build.build_num}}
                </li>

                <li class="collection-item" :class="buildStatusClass">
                    <b>{{ $t("message.build_status") }}</b> {{build.status}}
                </li>

                <li class="collection-item">
                    <a :href="build.build_url" target="_blank">
                        {{ $t("message.circleci_link_text") }}
                    </a>
                </li>

                <li class="collection-item">
                    <a :href="build.vcs_url" target="_blank">
                        {{ $t("message.vcs_link_text") }}
                    </a>
                </li>
            </ul>
        </div>


        <div class="col s12 m6 l12" v-if="showArtifactList">
            <ArtifactList
                :vcs="project.vcs"
                :username="project.username"
                :project="project.project"
                :buildNum="build.build_num"
            />
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';
    import ArtifactList from '@/components/ArtifactList';

    export default {
        components: {
            ArtifactList
        },
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
            },

            showArtifactList: {
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

        }
    };
</script>
