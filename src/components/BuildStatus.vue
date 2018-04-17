<template>
    <span v-if="build">
        <i class="material-icons" :class="buildStatusClass" v-if="isBuildSuccessful">done</i>
        <i class="material-icons" :class="buildStatusClass" v-if="!isBuildSuccessful">cancel</i>
    </span>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';

    export default {

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

            buildNum: {
                type: Number,
                required: true
            },
        },

        data() {
            return {
                buildStatusClass: null,
                isBuildSuccessful: null,
                build: null,
            };
        },

        mounted() {
            this.load()
                .then(() => {

                })
        },

        methods: {
            load() {
                return this.$circle.getBuildInfo(this.vcs, this.username, this.project, this.buildNum, this.$route.query.branch)
                    .then((build) => {
                        this.build = build;

                        const {
                            status,
                        } = build;

                        const classMap = {
                            'success': 'green-text lighten-4',
                            'fixed': 'green-text lighten-4',
                            'failed': 'red-text lighten-4',
                        };

                        const successfulMapping = {
                            'success': true,
                            'fixed': true,
                            'failed': false,
                        };


                        this.isBuildSuccessful = successfulMapping[status];

                        this.buildStatusClass = classMap[status] || null;
                    })
            }
        }
    };
</script>
