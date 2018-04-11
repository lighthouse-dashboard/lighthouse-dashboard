<template>
    <div id="app">

        <div v-if="!token" class="panel">
            <h5 class="center-align red-text">
                {{ $t("message.no_token_available") }}
            </h5>
        </div>
        <div v-if="token">
            <SideNav id="slide-out" class="sidenav sidenav-fixed"/>

            <div class="fixed-action-btn hide-on-large-only">
                <a class="btn-floating btn-large waves-effect waves-light green darken-2" @click="open">
                    <i class="material-icons">menu</i>
                </a>
            </div>

            <main>
                <router-view/>
            </main>

        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    import SideNav from './components/SideNav'

    export default {
        name: "App",

        components: {
            SideNav
        },

        data() {
            return {
                sidenav: null,
                token: Vue.config.circleToken
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


<style>
    header, main, footer {
        padding-left: 300px;
    }

    @media only screen and (max-width: 992px) {
        header, main, footer {
            padding-left: 0;
        }
    }

</style>
