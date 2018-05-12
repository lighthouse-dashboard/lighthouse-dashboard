<template>
    <div>
        <build-detail-view
            :vcs="vcs"
            :username="username"
            :project="project"
            :buildnum="buildnum"
        />
    </div>
</template>

<script>
    import Vue from "vue";
    import { mapGetters } from 'vuex';

    import BuildDetailView from "@/components/build-detail-view";

    export default {

        components: {
            BuildDetailView,
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

            buildnum: {
                type: Number,
                required: true,
            },
        },


        data() {
            return {};
        },

        computed: {
            ...mapGetters({
                branch: 'branch',
            }),
        },


    };
</script>
