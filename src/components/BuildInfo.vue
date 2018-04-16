<template>
    <div class="row" v-if="build">
        <div class="card">
            <div class="card-content">
                <h4>
                    #{{ build.build_num }}
                </h4>

                <div class="row">
                    <div class="col s12 m6 l12">
                        <ul class="collection">
                            <li class="collection-item avatar" v-if="user">
                                <img :src="user.avatar_url" alt="" class="circle">
                                <b>{{ $t("message.user") }}</b> {{user.login}}
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
                </div>
            </div>
        </div>

                        <ArtifactList
                            :vcs="vcs"
                            :username="username"
                            :project="project"
                            :buildNum="buildNum"
                        />

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
                build: null,
                branch: null,
                user: null,
                htmlArtifacts: [],
                buildCompletedTime: null,
                buildDuration: null,
                buildStatusClass: null,
            };
        },

        mounted() {
            this.loadBuild()
                .then(() => {
                    this.loadInfo();
                })
        },

        methods: {
            loadBuild() {
                return this.$circle.getBuildInfo(this.vcs, this.username, this.project, this.buildNum, this.$route.query.branch)
                    .then((build) => {
                        this.build = build;
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                        if (e.status === 401) {
                            this.$auth.logout();
                            this.$router.push({ name: 'login' });
                        }
                    })
            },
            loadInfo() {
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

                this.user = user;
            }
        }
    };
</script>
