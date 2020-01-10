<template>
    <v-dialog
            v-model="modal"
            max-width="320">
        <v-card>
            <v-card-title class="headline">
                Settings <small> {{ siteConfig.id }}</small>
            </v-card-title>

            <v-card-text>
                <v-checkbox
                        v-model="siteConfig.is_favorite"
                        color="secondary"
                        label="Is Favorite"/>
            </v-card-text>

            <v-card-actions>
                <v-spacer/>
                <v-btn text
                        color="secondary"
                        @click="save">
                    Save
                </v-btn>
            </v-card-actions>
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
                /** @type {SiteConfig} */
                siteConfig: null,
                modal: true,
            };
        },


        methods: {
            ...mapActions('sites', ['getSite', 'updateSite']),

            save() {
                this.updateSite({ id: this.siteConfig.id, delta: { is_favorite: this.siteConfig.is_favorite } });
                this.$emit('close');
            },
        },

        async mounted() {
            this.siteConfig = await this.getSite({ siteId: this.id });
        },
    };
</script>
