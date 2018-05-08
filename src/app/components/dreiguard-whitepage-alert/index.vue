<template>
    <div v-if="dreiguardArtifacts && dreiguardArtifacts.length > 0">
        <div class="red-text" v-if="showAlert">
            <p>
                <i class="material-icons small">warning</i> {{ $t("dreiguard.whitepage_alert") }}
            </p>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';
    import { mapGetters } from 'vuex';

    export default {
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
            buildnum: {
                type: Number,
                required: false,
                default: null
            },
        },

        data() {
            return {
                maxWhiepageDiff: Vue.config.whitepageAlerts,
                dreiguardArtifacts: null,
            };
        },

        computed: {
            ...mapGetters({
                branch: 'branch',
            }),

            showAlert() {
                if (!this.dreiguardArtifacts || this.dreiguardArtifacts.length <= 0) {
                    return false;
                }

                return this.dreiguardArtifacts.some((artifact) => {
                    return artifact.some((report) => {
                        return report.whitepageDiff && report.whitepageDiff.percentage >= this.maxWhiepageDiff;
                    });
                });
            },
        },

        methods: {
            load() {
                this.getBuildNum()
                    .then(num => {
                        this.loadDiffData(num);
                    });
            },

            getBuildNum() {
                if (this.buildnum) {
                    return Promise.resolve(this.buildnum);
                }

                return this.$api.getLatestBuilds(this.vcs, this.username, this.project, this.branch)
                    .then((builds) => {
                        return builds.shift().build_num;
                    });
            },

            loadDiffData(buildnum) {
                return this.$api.getDreiguardData(this.vcs, this.username, this.project, buildnum)
                    .then(data => {
                        this.dreiguardArtifacts = data;
                    });
            }
        },

        watch: {
            username() {
                this.images = null;
                this.load();
            },
            project() {
                this.images = null;
                this.load();
            },
        },

        mounted() {
            this.load();
        },
    };
</script>
