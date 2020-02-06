<template>
    <overlay title="Settings">
        <template slot="content">
            <v-text-field readonly
                    label="ID"
                    :value="siteConfig.id"/>

            <v-text-field readonly
                    label="Last Audit"
                    :value="siteConfig.last_audit"/>

            <v-text-field readonly
                    label="Device"
                    :value="siteConfig.device"/>

            <v-text-field readonly
                    label="Address"
                    :value="siteConfig.url"/>

            <v-text-field readonly
                    label="Github Hook Url"
                    :value="githubWebhookUrl"/>

            <v-checkbox
                    v-model="siteConfig.is_favorite"
                    color="secondary"
                    label="Is Favorite"/>
        </template>

        <template slot="actions">
            <v-btn text
                    color="secondary"
                    @click="save">
                Save
            </v-btn>
        </template>
    </overlay>
</template>

<script>
    import { mapActions } from 'vuex';
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
                return `${ window.location.protocol }//${ window.location.host }/api/reports/${ this.id }?token=${ this.siteConfig.token }`;
            },
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
