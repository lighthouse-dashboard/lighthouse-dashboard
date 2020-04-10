<template>
    <overlay title="Settings">
        <template slot="content">
            <v-text-field
                    v-model="siteConfig.name"
                    label="Name"/>

            <v-text-field readonly
                    label="Last Audit"
                    :value="siteConfig.last_audit | date"/>

            <v-text-field readonly
                    label="Device"
                    :value="siteConfig.device"/>

            <v-text-field
                    v-model="siteConfig.url"
                    label="Address"/>

            <v-text-field readonly
                    label="Github Hook Url"
                    :value="githubWebhookUrl"/>

            <v-checkbox
                    v-model="siteConfig.is_favorite"
                    color="primary"
                    label="Is Favorite"/>
        </template>

        <template slot="actions">
            <v-btn text
                    color="primary"
                    @click="save">
                Save
            </v-btn>
        </template>
    </overlay>
</template>

<script>
    import { mapActions } from 'vuex';
    import { POST_WEBHOOK_URL } from '../../config/routes';
    import Overlay from '../dialog/dialog';

    export default {
        components: { Overlay },
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
                return POST_WEBHOOK_URL(this.siteConfig.token);
            },
        },


        methods: {
            ...mapActions('sites', ['getSite', 'updateSite']),

            save() {
                this.updateSite({
                    id: this.siteConfig.id,
                    delta: {
                        is_favorite: this.siteConfig.is_favorite,
                        name: this.siteConfig.name,
                        url: this.siteConfig.url,
                    },
                });
                this.$emit('close');
            },
        },

        async mounted() {
            this.siteConfig = await this.getSite({ siteId: this.id });
        },
    };
</script>
