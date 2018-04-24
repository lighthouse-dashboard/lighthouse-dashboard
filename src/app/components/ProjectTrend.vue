<template>
    <div>
        <div class="row">

            <div class="col s4">
                <h5>
                    <router-link
                        :to="{name: 'overview', params: {vcs, username, project}, query: $route.query}">
                        <build-status
                            :vcs="vcs"
                            :username="username"
                            :project="project"
                            :buildNum="buildNum"/>
                        {{ project }}
                    </router-link>
                </h5>
            </div>

            <div class="col s4"></div>
            <div class="col s4">
                <h5 v-if="build">
                    <built-at :stopTime="build.stop_time"/>
                </h5>
            </div>
        </div>

        <div class="row">
            <div class="col s12">
                <trend-table
                    :vcs="vcs"
                    :username="username"
                    :project="project"
                />
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import BuildStatus from '@/components/BuildStatus';
    import DashboardProjectTitle from "@/components/DashboardProjectTitle";
    import TrendTable from "@/components/trend/TrendTable";
    import BuiltAt from '@/components/cards/BuiltAt';


    export default {

        components: {
            DashboardProjectTitle,
            TrendTable,
            BuildStatus,
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
            buildNum: {
                type: Number,
                required: true,
            },
        },

        data() {
            return {
                build: null,
                updater: null,
            };
        },

        methods: {
            load() {
                return this.$api
                    .getBuildInfo(this.vcs, this.username, this.project, this.buildNum, this.$route.query.branch)
                    .then((build) => {
                        this.build = build;
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
            this.load()
        },
    };
</script>
