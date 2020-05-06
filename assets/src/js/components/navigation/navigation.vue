<template>
    <nav class='navigation'>
        <div class='navigation--top'>
            <div class="navigation--header">
                <img class="navigation--logo"
                        src="static/img/logo_small.png"/>
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
        </div>

        <div class='navigation--bottom'>
            <ul class='navigation--list'>
                <li class='navigation--list-item navigation--list-item__footer'>
                    <small>v{{ version }}</small>
                </li>
            </ul>
        </div>
    </nav>
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
