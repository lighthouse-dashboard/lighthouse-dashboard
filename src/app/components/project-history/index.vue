<template>
    <div>
        <div class="row" v-for="(target, key) in data" :key="key">
            <div class="col s12">
                <div class="card">
                    <div class="card-content">
                        <div class="card-title">
                            <small>{{ target.tag }}</small>
                            <a target="_blank" :href="target.url">{{ target.url }}</a>
                        </div>

                        <artifact-history-chart
                            v-if="target"
                            :showlegend="showlegend"
                            :showx="showx"
                            :showy="showy"
                            :height="height"
                            :data="target.series"
                            :categories="target.categories"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import ArtifactHistoryChart from "@/components/history-chart";

    export default {

        components: {
            ArtifactHistoryChart,
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

            height: {
                type: Number,
                default: 380,
            },

            showlegend: {
                type: Boolean,
                default: true,
            },
            showx: {
                type: Boolean,
                default: false,
            },
            showy: {
                type: Boolean,
                default: false,
            },
        },

        data() {
            return {
                data: null,
                updater: null,
            };
        },

        computed: {
            ...mapGetters({
                branch: 'branch',
            }),
        },

        methods: {
            load() {
                this.$api
                    .getProjectHistoryData(this.vcs, this.username, this.project, this.branch)
                    .then(data => {
                        this.data = data;
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
