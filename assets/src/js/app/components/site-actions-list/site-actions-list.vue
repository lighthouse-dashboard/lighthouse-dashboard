<template>
    <tile title="Tools"
            class="site-actions-list">
        <ul class="site-actions-list--list">
            <li class="site-actions-list--list-item"
                    v-for="entry in menuEntries"
                    :key="entry.name">
                <btn target="_blank"
                        facet="flat"
                        :href="entry.link">
                    {{ entry.name }}
                </btn>
            </li>
        </ul>
    </tile>
</template>

<script>
    import { customProjectMenuEntries } from '../../../../../../config/dashboard';
    import Btn from '../base/btn/btn';
    import Tile from '../tile/tile';

    export default {
        components: { Btn, Tile },
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
