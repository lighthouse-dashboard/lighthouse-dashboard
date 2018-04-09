<template>
    <div>
        <div class="navbar-fixed">
            <nav class="green lighten-1">
                <div class="nav-wrapper">
                    <router-link :to="{name: 'index'}" class="brand-logo center">
                        {{username}}/{{project}}
                    </router-link>
                </div>
            </nav>
        </div>

        <loader v-if="!data"/>

        <div>
            <div v-for="(target, url) in data">
                <h6>{{url}}</h6>
                <ArtifactHistoryViewer :url="url" :data="target" v-if="target"/>
            </div>
        </div>
    </div>
</template>

<script>

    import ArtifactHistoryViewer from "../components/ArtifactHistoryViewer";

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
            },
            token: {
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
                    project: this.project,
                    token: this.token,
                };

                this.$circle.getDashboardForAllBuilds(this.projectObject)
                    .then((data) => {
                        this.data = data;
                    });
            }
        }
    };
</script>
