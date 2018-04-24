<template>
    <router-link
        tag="li"
        active-class="active"
        :to="{name: 'overview', params: project, query: $route.query}">
        <a>
            {{ project.project }}
            <building-animation class="right" v-if="hasRunningBuild" :size="20"/>
        </a>
    </router-link>
</template>

<script>

    import Vue from 'vue';
    import BuildingAnimation from '@/components/building-animation';

    export default {
        components: {
            BuildingAnimation,
        },

        props: {
            project: {
                type: Object,
                required: true,
            },
        },

        data() {
            return {
                hasRunningBuild: false,
                updater: null,
            };
        },

        methods: {
            checkIfHasRunning() {
                this.$api.hasRunningBuild(this.project.vcs, this.project.username, this.project.project, this.$route.query.branch)
                    .then((has) => {
                        this.hasRunningBuild = has;
                        this.updater = setTimeout(() => {
                            this.checkIfHasRunning();
                        }, Vue.config.buildStatusInterval);
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
            this.checkIfHasRunning();
        },
    };
</script>
