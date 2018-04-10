<template>
    <div>
        <loader v-if="!data"/>

        <div class="row">
            <div class="col s12" v-for="(target, url, index) in data" :class="{'grey lighten-5': index%2}">
                <ArtifactHistoryViewer :url="url" :data="target.scores" :categories="target.builds" v-if="target"/>
            </div>
        </div>
    </div>
</template>

<script>

    import ArtifactHistoryViewer from "../../components/ArtifactHistoryViewer";

    export default {

        components: {
            ArtifactHistoryViewer,
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
                projectObject: null,
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
                this.projectObject = {
                    vcs: this.vcs,
                    username: this.username,
                    project: this.project
                };


                this.$circle.getAllBuildsWithDashboardArtifacts(this.projectObject, undefined, this.$route.query.branch)
                    .then(data => {
                        this.data = data;
                    })
                    .catch((e) => {
                        this.$toast.error(e);
                    })
            }
        }
    };
</script>
