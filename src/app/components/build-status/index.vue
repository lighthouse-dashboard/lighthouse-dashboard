<template>
    <span>
        <i class="material-icons" v-if="isBuildSuccessful === null" :class="buildStatusClass">help_outline</i>
        <i class="material-icons" v-if="isBuildSuccessful" :class="buildStatusClass">done</i>
        <i class="material-icons" v-if="isBuildSuccessful === false" :class="buildStatusClass">cancel</i>
    </span>
</template>

<script>
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

            buildNum: {
                type: Number,
                required: true,
            },
        },

        data() {
            return {
                buildStatusClass: null,
                isBuildSuccessful: null,
                build: null,
            };
        },

        methods: {
            load() {
                return this.$api.getBuildInfo(this.vcs, this.username, this.project, this.buildNum, this.$route.query.branch)
                    .then((build) => {
                        this.build = build;

                        const {
                            status,
                        } = build;

                        const classMap = {
                            success: 'green-text lighten-4',
                            fixed: 'green-text lighten-4',
                            failed: 'red-text lighten-4',
                        };

                        const successfulMapping = {
                            success: true,
                            fixed: true,
                            failed: false,
                        };

                        this.isBuildSuccessful = successfulMapping[status];
                        this.buildStatusClass = classMap[status] || null;
                    });
            },
        },

        mounted() {
            this.load();
        },
    };
</script>
