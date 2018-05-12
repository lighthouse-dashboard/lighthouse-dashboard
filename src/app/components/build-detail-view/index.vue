<template>
    <div class="row">
        <div class="col s12" v-if="build">
            <div class="row">
                <div class="col s12 m2">
                    <div>
                        <router-link
                            :to="{name: 'buildinfo', params: {vcs, username, project, buildnum: build.build_num}}">
                            #{{ build.build_num}}
                        </router-link>
                    </div>
                    <div>
                        <built-at :stopTime="build.stop_time"/>
                    </div>
                </div>

                <div class="build-title__cell col s12 m10">
                    <commit-detail
                        v-if="build"
                        :useravatar="build.user.avatar_url"
                        :username="build.user.name"
                        :commitmessage="build.subject"
                    />
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col s12">
                <ul class="tabs" ref="tabs">
                    <li class="tab col s4"><a class="active" href="#dreihouse">Dreihouse</a></li>
                    <li class="tab col s4"><a href="#dreiguard">Dreiguard</a></li>
                    <li class="tab col s4"><a href="#artifacts">Artifacts</a></li>
                </ul>
            </div>
            <div class="col s12" id="dreihouse" >
                <build-charts
                    :vcs="vcs"
                    :username="username"
                    :project="project"
                    :buildnum="buildnum"
                />
            </div>
            <div class="col s12" id="dreiguard" >
                <dreiguard-overview
                    :vcs="vcs"
                    :username="username"
                    :project="project"
                    :buildnum="buildnum"/>
            </div>
        </div>
        <div class="col s12" id="artifacts">
            <artifact-list
                :vcs="vcs"
                :username="username"
                :project="project"
                :buildnum="buildnum"
            />
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
            const instance = M.Tabs.init(this.$refs.tabs, {});

        },

    };
</script>
