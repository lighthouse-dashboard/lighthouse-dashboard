<template>
    <div class="row" v-if="build">
        <div class="col s6 m4 l3">
            <div>
                <h5>
                    <built-at :stopTime="build.stop_time"/>
                </h5>
            </div>
        </div>

        <div class="col s6 m4 l3">
            <div>
                <router-link
                    :to="{name: 'overview', params: {vcs, username, project}, query: $route.query}">
                    <h5>
                        <build-status
                            :vcs="vcs"
                            :username="username"
                            :project="project"
                            :buildnum="buildnum"/>
                        {{ project }}
                    </h5>
                </router-link>
            </div>

            <div>
                <router-link :to="{name: 'buildinfo', params: {vcs, username, project, buildnum}}">
                    {{ $t("message.latest_build") }} #{{ buildnum }}
                </router-link>
            </div>
        </div>

        <div class="col s12 m3 l3" v-if="build && user">
            <commit-detail :commitmessage="build.subject" :username="user.login" :useravatar="user.avatar_url"/>
        </div>


        <div class="col s12 m4 l3">
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
                type: [Number, String],
                required: true,
            },
        },

        data() {
            return {
                user: null,
                build: null,
                updater: null,
                hasReachedBudget: false,
            };
        },


        methods: {
            load() {
                return this.$api
                    .getBuildInfo(this.vcs, this.username, this.project, this.buildnum)
                    .then((build) => {
                        this.build = build;
                        const {
                            user,
                        } = this.build;

                        console.log(user);
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
            this.load();
        },
    };
</script>
