<template>
    <div id="app">
        <ProjectList id="slide-out" class="sidenav" :projects="projects"/>
        <div class="fixed-action-btn">
            <a class="btn-floating btn-large waves-effect waves-light green darken-2" @click="open"><i
                class="material-icons">menu</i></a>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

    import Vue from 'vue';
    import ProjectList from './components/ProjectList'

    export default {
        name: "App",

        components: {
            ProjectList
        },

        data() {
            return {
                sidenav: null,
                projects: Vue.config.projects
            }
        },

        mounted() {
            M.AutoInit();

            var elem = document.querySelector('.sidenav');
            this.sidenav = M.Sidenav.init(elem, {});
        },

        methods: {
            open() {
                this.sidenav.open();
            }
        }
    };
</script>
