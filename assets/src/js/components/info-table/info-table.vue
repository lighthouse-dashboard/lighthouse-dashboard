<template>
    <v-dialog
            v-model="modal"
            max-width="320">
        <v-card>
            <v-card-title class="headline">
                {{ siteConfig.id }}
            </v-card-title>

            <v-card-text>

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
                /** @type {SiteConfig} */
                siteConfig: null,
                modal: true,
            };
        },

        computed: {
            githubWebhookUrl() {
                if (!this.siteConfig) {
                    return null;
                }
                return `${ window.location.protocol }//${ window.location.host }/api/reports/${ this.id }?token=${ this.siteConfig.token }`;
            },
        },


        methods: {
            ...mapActions('sites', ['getSite', 'updateSite']),
        },

        async mounted() {
            this.siteConfig = await this.getSite({ siteId: this.id });
        },
    };
</script>
