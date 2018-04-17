<template>
    <div v-if="build">
        <div class="col s12 m4 l3">
            <Card>
                <span slot="title">{{ $t("message.build_num") }}</span>
                <BuildStatus
                    :vcs="vcs"
                    :username="username"
                    :project="project"
                    :buildNum="buildNum"/>
                #{{build.build_num}}


                <Pineapple v-if="hasReachedBudget" class="right" :size="45"/>
            </Card>
        </div>

        <div class="col s12 m4 l3">
            <BuiltAt :stopTime="build.stop_time"/>

        </div>

        <div class="col s12 m4 l3">
            <Card>
                <span slot="title">{{ $t("message.build_duration") }}</span>
                {{ buildDuration }}
            </Card>
        </div>

        <div class="col s12 m4 l3" v-if="user">
            <Card class="author-card">
                <span slot="title">{{ $t("message.commit") }}</span>
                <img :src="user.avatar_url" alt="" class="circle left avatar">
                <span class="truncate">{{build.subject}}</span>
            </Card>
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

    import Pineapple from '@/components/happyPineapple';

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
                hasReachedBudget: null,
            };
        },

        mounted() {
            this.loadBuild()
                .then(() => {
                    return this.loadInfo();
                })
                .then(() => {
                    this.$circle.hasAllartifactsReachedBudget(this.vcs, this.username, this.project, this.buildNum)
                        .then((has) => {
                            this.hasReachedBudget = has;
                        })
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
                } = this.build;

                this.buildDuration = moment.duration(build_time_millis).humanize();

                this.user = user;
            }
        }
    };
</script>
