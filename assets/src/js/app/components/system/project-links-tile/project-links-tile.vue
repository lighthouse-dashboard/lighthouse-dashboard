<template>
    <tile title="Links">
        <list>
            <list-item>
                <a class="link"
                        href="/app/system/changelog">
                    {{ $t('system.changelog') }}
                </a>
            </list-item>

            <list-item>
                <a class="link"
                        target="_blank"
                        href="/storybook/index.html">
                    {{ $t('system.storybook') }}
                </a>
            </list-item>


            <list-item>
                <a class="link"
                        target="_blank"
                        href="https://github.com/lighthouse-dashboard/lighthouse-dashboard/projects/1">
                    {{ $t('system.roadmap') }}
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
