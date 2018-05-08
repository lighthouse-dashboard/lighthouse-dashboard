<template>
    <div class="row">
        <div class="row" v-if="build">
            <div class="col s12 m4" >
                <router-link :to="{name: 'buildinfo', params: {vcs, username, project, buildnum: build.build_num}}">
                    #{{ build.build_num}}
                </router-link>
            </div>
            <div class="col s12 m8">
                <built-at :stopTime="build.stop_time"/>
            </div>
        </div>

        <div class="build-title__cell col s12">
            <commit-detail
                v-if="build"
                :useravatar="build.user.avatar_url"
                :username="build.user.name"
                :commitmessage="build.subject"
            />
        </div>

        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <div class="card-title">Dreihouse</div>

                    <build-charts
                        :vcs="vcs"
                        :username="username"
                        :project="project"
                        :buildnum="buildnum"
                    />
                </div>
            </div>
        </div>

        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <div class="card-title">Dreiguard</div>
                    <dreiguard-overview
                        :vcs="vcs"
                        :username="username"
                        :project="project"
                        :buildnum="buildnum"/>
                </div>
            </div>
        </div>

        <div class="col s12">
            <div class="card">
                <div class="card-content">
                    <div class="card-title">{{ $t("message.artifacts") }}</div>
                    <artifact-list
                        :vcs="vcs"
                        :username="username"
                        :project="project"
                        :buildnum="buildnum"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BuiltAt from '@/components/built-at';

    import BuildTitle from "@/components/build-title";
    import BuildCharts from "@/components/build-charts";
    import ArtifactList from '@/components/artifact-list';
    import DreiguardOverview from '@/components/dreiguard-overview';
    import CommitDetail from '@/components/commit-detail';


    export default {

        components: {
            BuildCharts,
            BuildTitle,
            ArtifactList,
            DreiguardOverview,
            CommitDetail,
            BuiltAt,
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
                type: Number,
                required: true,
            },
        },

        data() {
            return {
                updater: null,
                artifacts: null,
                build: null
            };
        },
        methods: {
            load() {
                return this.$api
                    .getBuildInfo(this.vcs, this.username, this.project, this.buildnum)
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
        },

        mounted() {
            this.load();
        },

    };
</script>
