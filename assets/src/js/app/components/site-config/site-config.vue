<template>
    <div class="site-config">
        <list class="site-config--list">
            <list-item class="site-config--list-item">
                <p class="caption">Name</p>
                <p>{{ config.name }}</p>
            </list-item>

            <list-item class="site-config--list-item">
                <p class="caption">URL</p>
                <p>
                    <btn facets="flat"
                            :href="config.url">{{config.name}}
                    </btn>
                </p>
            </list-item>

            <list-item class="site-config--list-item">
                <p class="caption">Last Audit</p>
                <p>{{ config.last_audit | format-date }}</p>
            </list-item>
        </list>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import Btn from '../base/btn/btn';
    import List from '../base/list/list';
    import ListItem from '../base/list/list-item/list-item';
    import Tile from '../tile/tile';

    export default {
        components: { ListItem, List, Btn, Tile },
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
