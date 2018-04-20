<template>
    <div>
        <loader v-if="!builds"/>

        <div class="row">
            <div class="col s4">
                <card>
                    <span slot="title">{{ $t('message.project') }}</span>
                    {{ project }}
                </card>
            </div>

            <div class="col s4">
                <card>
                    <span slot="title">{{ $t('message.link') }}</span>
                    <ci-link :username="username" :project="project"/>
                </card>
            </div>


            <div class="col s4">
                <card>
                    <span slot="title">{{ $t('message.link') }}</span>
                    <git-hub-link :username="username" :project="project"/>
                </card>
            </div>
        </div>

        <div v-if="builds">
            <build
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
        },

        data() {
            return {
                builds: null,
                projectObject: null,
                updater: null,
            };
        },

        methods: {
            load() {
                this.projectObject = {
                    vcs: this.vcs,
                    username: this.username,
                    project: this.project,
                };

                this.$api
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
                    });
            },
        },

        watch: {
            token() {
                this.load();
            },

            project() {
                this.load();
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
