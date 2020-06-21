<template>
    <tile title="Links">
        <list>
            <list-item>
                <router-link
                        class="link"
                        :to="{name: 'changelog'}">
                    Changelog
                </router-link>
            </list-item>

            <list-item>
                <a class="link"
                        target="_blank"
                        href="/storybook/index.html">
                    Storybook
                </a>
            </list-item>
        </list>
    </tile>
</template>

<script>
    import List from '../../base/list/list';
    import ListItem from '../../base/list/list-item/list-item';
    import Tile from '../../tile/tile';

    export default {
        components: { List, Tile, ListItem },
        props: {},
    };
</script>
