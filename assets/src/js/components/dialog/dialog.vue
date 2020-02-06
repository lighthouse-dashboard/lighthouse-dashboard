<template>
    <v-dialog
            v-model="model"
            max-width="320">
        <v-card>
            <v-card-title class="headline">
                {{ title }}
            </v-card-title>

            <v-card-text>
                <slot name="content"/>
            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <slot name="actions"/>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

    export default {
        props: {
            title: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                model: true,
            };
        },
    };
</script>
