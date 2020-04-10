<template>
    <v-icon color="secondary"
            v-if="is_favorite">
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
            is_favorite: {
                type: Boolean,
                required: true,
            },
        },
    };
</script>
