<template>
    <v-icon color="secondary"
            v-if="isFavorite">
        mdi-star
    </v-icon>
    <v-icon color="secondary"
            v-else>
        mdi-star-outline
    </v-icon>
</template>

<script>
    export default {
        props: {
            isFavorite: {
                type: Boolean,
                required: true,
            },
        },
    };
</script>
