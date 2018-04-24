<template>
    <div id="app">
        <side-nav class="sidenav sidenav-fixed" id="slide-out"/>
        <div class="fixed-action-btn hide-on-large-only">
            <a class="btn-floating btn-large waves-effect waves-light green darken-2" @click="open">
                <i class="material-icons">menu</i>
            </a>
        </div>
        <main>
            <router-view/>
        </main>
    </div>
</template>

<script>
    import SideNav from '@/components/sidenav';

    export default {
        name: 'App',

        components: {
            SideNav,
        },

        data() {
            return {
                sidenav: null,
            };
        },

        methods: {
            open() {
                this.sidenav.open();
            },
        },

        mounted() {
            let elem = document.querySelector('.sidenav');
            this.sidenav = M.Sidenav.init(elem, {}); //eslint-disable-line
        },

    };
</script>
