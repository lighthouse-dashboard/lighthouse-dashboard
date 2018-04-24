<template>
    <div v-if="build">
        <div class="col s12 m4 l3">
            <card>
                <span slot="title">{{ $t("message.build_num") }}</span>
                <build-status
                    :vcs="vcs"
                    :username="username"
                    :project="project"
                    :buildNum="buildNum"/>
                #{{ build.build_num }}
                <pineapple class="right" v-if="hasReachedBudget" :size="45"/>
            </card>
        </div>

        <div class="col s12 m4 l3">
            <built-at :stopTime="build.stop_time"/>

        </div>

        <div class="col s12 m4 l3">
            <card>
                <span slot="title">{{ $t("message.build_duration") }}</span>
                {{ buildDuration }}
            </card>
        </div>

        <div class="col s12 m4 l3" v-if="user">
            <card class="author-card">
                <span slot="title">{{ $t("message.commit") }}</span>
                <img alt="" class="circle left avatar" :src="user.avatar_url">
                <span class="truncate">{{ build.subject }}</span>
            </card>
        </div>
    </div>
</template>

<script>

    import moment from 'moment';

    import ArtifactList from '@/components/ArtifactList';
    import BuildStatus from '@/components/BuildStatus';

    import BuildNum from '@/components/cards/BuildNum';
    import Author from '@/components/cards/Author';
    import Card from '@/components/cards/Card';
    import BuiltAt from '@/components/cards/BuiltAt';

    import Pineapple from '@/components/HappyPineapple';

    export default {
        components: {
            ArtifactList,
            BuildStatus,
            BuildNum,
            Author,
            Card,
            BuiltAt,
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
                build: null,
                branch: null,
                user: null,
                htmlArtifacts: [],
                buildCompletedTime: null,
                buildDuration: null,
                buildStatusClass: null,
                hasReachedBudget: null,
            };
        },

        methods: {
            loadBuild() {
                return this.$api.getBuildInfo(this.vcs, this.username, this.project, this.buildNum, this.$route.query.branch)
                    .then((build) => {
                        this.build = build;
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                        if (e.status === 401) {
                            this.$auth.logout();
                            this.$router.push({ name: 'login' });
                        }
                    });
            },

            loadInfo() {
                const {
                    user,
                    build_time_millis, // eslint-disable-line
                } = this.build;

                this.buildDuration = moment.duration(build_time_millis).humanize();

                this.user = user;
            },
        },

        mounted() {
            this.loadBuild()
                .then(() => {
                    return this.loadInfo();
                });
        },
    };
</script>
