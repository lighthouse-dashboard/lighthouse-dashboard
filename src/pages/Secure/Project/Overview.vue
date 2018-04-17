<template>
    <div>
        <loader v-if="!builds"/>

        <div class="row">
            <div class="col s4">
                <Card>
                    <span slot="title">{{ $t('message.project')}}</span>
                    {{project}}
                </Card>
            </div>

            <div class="col s4">
                <Card>
                    <span slot="title">{{ $t('message.link')}}</span>
                    <CiLink :username="username" :project="project"/>
                </Card>
            </div>


            <div class="col s4">
                <Card>
                    <span slot="title">{{ $t('message.link')}}</span>
                    <GitHubLink :username="username" :project="project"/>
                </Card>
            </div>
        </div>

        <div v-if="builds">
            <Build
                v-for="(build, index) in builds"
                :class="{'grey lighten-5': index%2}"
                :vcs="vcs"
                :username="username"
                :project="project"
                :buildNum="build.build_num"
                :key="build.build_num"/>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";

    import Build from "@/components/Build";
    import Card from '@/components/cards/Card';
    import CiLink from '@/components/links/ci';
    import GitHubLink from '@/components/links/github';

    export default {

        components: {
            Build,
            Card,
            CiLink,
            GitHubLink,
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
                builds: null,
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

                this.$circle
                    .getAllBuilds(this.vcs, this.username, this.project, undefined, this.$route.query.branch)
                    .then(builds => {
                        this.builds = builds;
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
                    })
            }
        }
    };
</script>
