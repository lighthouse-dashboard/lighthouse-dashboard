<template>
    <v-dialog
            v-model="modal"
            max-width="320">
        <v-card>
            <v-card-title class="headline">
                Project Settings
            </v-card-title>

            <v-card-text>
                <pre v-text="$attrs"/>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        props: {
            id: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                siteConfig: null,
                modal: true,
            };
        },


        methods: {
            ...mapActions('sites', ['getSite']),
        },

        async mounted() {
            this.siteConfig = await this.getSite({ siteId: this.id });
        },
    };
</script>
