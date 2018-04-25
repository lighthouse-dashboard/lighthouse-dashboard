<template>
    <div>
        <loader v-if="!builds"/>

        <div v-if="builds">
            <build
                v-for="(build, index) in builds"
                :class="{'grey lighten-5': index%2}"
                :buildnum="build.build_num"
                :key="build.build_num"/>
        </div>
    </div>
</template>

<script>
    import Vue from "vue";
    import { mapGetters } from 'vuex';

    import Build from "@/components/build-view";

    export default {

        components: {
            Build,
        },


        data() {
            return {
                builds: null,
                updater: null,
            };
        },

        computed: {
            ...mapGetters({
                vcs: 'vcs',
                username: 'username',
                project: 'project',
                branch: 'branch',
            }),
        },

        methods: {
            load() {
                this.$api
                    .getAllBuilds(this.vcs, this.username, this.project, this.branch)
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
