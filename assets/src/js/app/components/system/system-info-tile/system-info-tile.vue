<template>
    <tile title="System" icon="cog">
        <ul class="list">
            <li class="list-item">
                <p class="u-reset  caption">
                    {{ $t('system.version-label') }}
                </p>
                <p class="u-reset subtitle1">v{{ version }}</p>
            </li>
        </ul>
    </tile>
</template>

<script>
    import Tile from '../../tile/tile';

    export default {
        components: { Tile },
        props: {
            version: {
                type: String,
                default: '',
            },
        },
    };
</script>
