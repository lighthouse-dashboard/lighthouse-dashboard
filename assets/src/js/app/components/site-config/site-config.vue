<template>
    <tile class="site-config"
            title="Settings">
        <ul class="site-config--list">
            <li class="site-config--list-item">
                <p class="caption">Name</p>
                <p>{{ config.name }}</p>
            </li>

            <li class="site-config--list-item">
                <p class="caption">URL</p>
                <p>
                    <btn facet="flat"
                            :href="config.url">{{config.name}}
                    </btn>
                </p>
            </li>

            <li class="site-config--list-item">
                <p class="caption">Last Audit</p>
                <p>{{ config.last_audit | date }}</p>
            </li>
        </ul>
    </tile>
</template>

<script>
    import { mapActions } from 'vuex';
    import Btn from '../base/btn/btn';
    import Tile from '../tile/tile';

    export default {
        components: { Btn, Tile },
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
