<template>
    <tile title="Tools"
            class="site-actions-list">
        <list class="site-actions-list--list">
            <list-item class="site-actions-list--list-item"
                    v-for="entry in menuEntries"
                    :key="entry.name">
                <btn target="_blank"
                        facet="flat"
                        :href="entry.link">
                    {{ entry.name }}
                </btn>
            </list-item>
        </list>
    </tile>
</template>

<script>
    import { customProjectMenuEntries } from '../../../../../../config/dashboard';
    import Btn from '../base/btn/btn';
    import List from '../base/list/list';
    import ListItem from '../base/list/list-item/list-item';
    import Tile from '../tile/tile';

    export default {
        components: { ListItem, List, Btn, Tile },
        props: {
            url: {
                type: String,
                required: true,
            },
        },
        computed: {
            menuEntries() {
                return customProjectMenuEntries.map((entry) => {
                    return {
                        name: entry.name,
                        link: entry.link(this.url),
                    };
                });
            },
        },
    };
</script>
