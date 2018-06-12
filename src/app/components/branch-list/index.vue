<template>
    <div>

        <li class="sidenav--subheader">
            <a class="subheader">{{ $t("message.branches") }}</a>
        </li>
        <li v-for="branch in branches"
            :key="branch"
            :class="{'active' : $route.query.branch === branch}">

            <router-link :to="{name: 'dashboard', query: {branch}}">
                {{ branch }}
            </router-link>
        </li>
    </div>
</template>

<script>

    import Vue from 'vue';

    export default {

        data() {
            return {
                branches: Vue.config.selectableBranches,
            };
        },

    };
</script>
