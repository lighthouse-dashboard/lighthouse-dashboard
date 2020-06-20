<template>
    <tile class="sites-list"
            :title="title"
            v-if="sites && sites.length > 0">
        <list>
            <list-item v-for="site in allSites"
                    :key="site.id">
                <router-link class="link"
                        :to="{name: 'project.detail', params: {id: site.id}}">
                    {{ site.name }}
                </router-link>
            </list-item>
        </list>
    </tile>
</template>

<script>
    import List from '../base/list/list';
    import ListItem from '../base/list/list-item/list-item';
    import Tile from '../tile/tile';

    export default {
        components: { Tile, ListItem, List },
        props: {
            /**
             * @type {Sites.SiteConfig[]}
             */
            sites: {
                type: Array,
                required: true,
            },
        },

        computed: {
            title() {
                return `Scheduled jobs (${ this.sites.length })`;
            },
            allSites() {
                return [...this.sites].slice(0, 5);
            },
        },
    };
</script>
