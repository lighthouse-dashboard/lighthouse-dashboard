<template>
    <h4>
        <site-favorite-state-icon :is_favorite="is_favorite"/>
        <slot/>
    </h4>
</template>

<script>
    import SiteFavoriteStateIcon from '../site-favorite-state-icon/site-favorite-state-icon';

    export default {
        components: { SiteFavoriteStateIcon },
        props: {
            is_favorite: {
                type: Boolean,
                required: true,
            },
        },
    };
</script>
