<template>
    <div>
        <loader v-if="!data"/>

        <div class="row">
            <div
                class="col s12"
                v-for="(target, url, index) in data"
                :class="{'grey lighten-5': index%2}">
                <div class="card">
                    <div class="card-content">
                        <div class="row">
                            <div class="col s12">
                                <div class="card-title"><a :href="url" target="_blank">{{url}}</a></div>
                                <ArtifactHistoryChart
                                    :url="url"
                                    :data="target.scores"
                                    :categories="target.builds"
                                    v-if="target"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

    import ArtifactHistoryChart from "@/components/ArtifactHistoryChart";

    export default {

        components: {
            ArtifactHistoryChart,
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
            }
        },

        watch: {
            token() {
                this.load();
            },
            project() {
                this.load();
            }
        },


        data() {
            return {
                data: null,
                updater: null,
            };
        },

        beforeDestroy() {
            if (this.updater) {
                clearTimeout(this.updater);
            }
        },

        mounted() {
            this.load();
        },

        methods: {
            load() {
                this.$circle.getAllBuildsWithDashboardArtifacts(this.vcs, this.username, this.project, this.$route.query.branch)
                    .then(data => {
                        this.data = data;
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                        if (e.status === 401) {
                            this.$auth.logout();
                            this.$router.push({ name: 'login' });
                        }
                    })
            }
        }
    };
</script>
