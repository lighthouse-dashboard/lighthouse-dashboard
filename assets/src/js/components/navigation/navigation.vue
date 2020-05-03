<template>
    <v-navigation-drawer v-model="drawer"
            tag="nav"
            class="navigation"
            flat
            app>
        <div class="navigation--header">
            <img class="navigation--logo" src="static/img/logo_small.png"/>
            <p class="navigation--title">{{ title }}</p>
        </div>
        <ul class="navigation--list">
            <router-link
                    tag="li"
                    active-class="navigation--list-item__active"
                    class="navigation--list-item"
                    to="/dashboard">Dashboard
            </router-link>

            <router-link
                    tag="li"
                    active-class="navigation--list-item__active"
                    class="navigation--list-item"
                    to="/overview">Projects Overview
            </router-link>

            <router-link
                    tag="li"
                    active-class="navigation--list-item__active"
                    class="navigation--list-item"
                    to="/projects">Search
            </router-link>
        </ul>
    </v-navigation-drawer>
</template>

<script>
    import { name, version } from '../../../../../package.json';

    export default {
        data() {
            return {
                drawer: true,
                mini: true,
                version,
                title: name,
            };
        },
    };
</script>
