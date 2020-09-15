<template>
    <tile class="sites-list"
            icon="rocket"
            :title="title"
            :facets="['no-padding']"
            v-if="sites && sites.length > 0">
        <ul class="list">
            <li class="list-item"
                    v-for="site in allSites"
                    :key="site.id">
                <a class="link"
                        :href="{name: 'project.detail', params: {id: site._id}}">
                    {{ site.name }}
                </a>
            </li>
        </ul>
    </tile>
</template>

<script>
    import Tile from '../tile/tile';

    export default {
        components: { Tile },
        props: {
            /**
             * @type {Sites.SiteModel[]}
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
