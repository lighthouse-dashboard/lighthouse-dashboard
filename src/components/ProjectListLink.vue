<template>
    <router-link
        tag="li"
        :to="{name: 'overview', params: project, query: $route.query}"
        active-class="active">
        <a>
            <i class="material-icons" v-if="hasRunningBuild">cloud_circle</i> {{ project.project }}
        </a>
    </router-link>
</template>

<script>

    import Vue from 'vue';

    export default {
        props: {
            project: {
                type: Object,
                required: true
            },
        },

        data() {
            return {
                hasRunningBuild: false,
                updater: null,
            };
        },

        beforeDestroy() {
            if (this.updater) {
                clearTimeout(this.updater);
            }
        },

        mounted() {
            this.checkIfHasRunning();
        },

        methods: {
            checkIfHasRunning() {
                this.$circle.hasRunningBuild(this.project.vcs, this.project.username, this.project.project, this.$route.query.branch)
                    .then((has) => {
                        this.hasRunningBuild = has;
                        this.updater = setTimeout(() => {
                            this.checkIfHasRunning();
                        }, Vue.config.buildStatusInterval)
                    })
                    .catch( (e) => {
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
