<template>
    <router-link
        tag="li"
        active-class="active"
        :to="{name: 'overview', params: {vcs, username, project}, query: $route.query}">
        <a>
            {{ project }}
            <building-animation class="right" v-if="hasRunningBuild" :size="20"/>
        </a>
    </router-link>
</template>

<script>

    import Vue from 'vue';
    import { mapGetters } from 'vuex';
    import BuildingAnimation from '@/components/building-animation';

    export default {
        components: {
            BuildingAnimation,
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
                hasRunningBuild: false,
                updater: null,
            };
        },


        computed: {
            ...mapGetters({
                branch: 'branch',
            }),
        },

        methods: {
            checkIfHasRunning() {
                this.$api.hasRunningBuild(this.vcs, this.username, this.project, this.branch)
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
