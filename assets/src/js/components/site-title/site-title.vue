<template>
    <h4>
        <site-favorite-state-icon :is-favorite="isFavorite"/>
        <slot/>
    </h4>
</template>

<script>
    import SiteFavoriteStateIcon from '../site-favorite-state-icon/site-favorite-state-icon';

    export default {
        components: { SiteFavoriteStateIcon },
        props: {
            isFavorite: {
                type: Boolean,
                required: true,
            },
        },
    };
</script>
