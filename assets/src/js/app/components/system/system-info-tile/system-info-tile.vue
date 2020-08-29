<template>
    <tile title="System">
        <list>
            <list-item>
                <span class="u-reset">
                    {{ $t('system.version-label') }}
                </span>
                <span class="u-reset">v{{ version }}</span>
            </list-item>
        </list>
    </tile>
</template>

<script>
    import ListItem from '../../base/list/list-item/list-item';
    import Tile from '../../tile/tile';

    export default {
        components: { ListItem, Tile },
        props: {
            version: {
                type: String,
                default: '',
            },
        },
    };
</script>
