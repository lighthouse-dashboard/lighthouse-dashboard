<template>
    <div class="site-config">
        <p class="subtitle1">Settings</p>
        <ul class="site-config--list">
            <li class="site-config--list-item">
                <p class="caption">Name</p>
                <p>{{ config.name }}</p>
            </li>

            <li class="site-config--list-item">
                <p class="caption">URL</p>
                <p><a class="link"
                        :href="config.url">{{config.name}}</a></p>
            </li>

            <li class="site-config--list-item">
                <p class="caption">Last Audit</p>
                <p>{{ config.last_audit | date }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        components: {},
        props: {
            /** @type {Sites.SiteConfig} */
            config: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {};
        },

        methods: {
            ...mapActions('sites', ['getCurrentSite']),
        },
    };
</script>
