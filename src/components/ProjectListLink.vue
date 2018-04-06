<template>
    <router-link
                 tag="li"
                 :to="{name: 'project', params: project}"
                 exact
                 active-class="active">
        <a><i class="material-icons" v-if="hasRunningBuild">cloud_circle</i> {{ project.project }}</a>
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
                hasRunningBuild : false
            };
        },

        mounted(){
            this.checkIfHasRunning();
        },
        methods: {
            checkIfHasRunning(){
                this.$circle.hasRunningBuild(this.project)
                .then((has) => {
                    this.hasRunningBuild = has;
                    setTimeout( () => {
                        this.checkIfHasRunning();
                    }, Vue.config.refreshInterval)
                })
            }
        }
    };
</script>
