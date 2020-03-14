<template>
    <v-card class="site-config">
        <v-card-title>Settings</v-card-title>
        <v-card-text>
            <v-list>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{ config.name }}</v-list-item-title>
                        <v-list-item-subtitle>Name</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{ config.url }}</v-list-item-title>
                        <v-list-item-subtitle>Url</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{ config.device }}</v-list-item-title>
                        <v-list-item-subtitle>Device</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{ config.token }}</v-list-item-title>
                        <v-list-item-subtitle>Token</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>{{ config.last_audit | date }}</v-list-item-title>
                        <v-list-item-subtitle>Last Audit</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-card-text>

        <v-card-actions>
            <v-spacer/>
            <v-btn @click="toggleEdit">Edit</v-btn>
        </v-card-actions>

        <project-settings v-if="isEdit"
                :id="config.id"
                @close="onCloseSettings"/>
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex';
    import ProjectSettings from '../project-settings/project-settings';

    export default {
        components: { ProjectSettings },
        props: {
            /** @type {SiteConfig} */
            config: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                isEdit: false,
            };
        },

        methods: {
            ...mapActions('sites', ['getCurrentSite']),

            toggleEdit() {
                this.isEdit = !this.isEdit;
            },
            onCloseSettings() {
                this.getCurrentSite({ siteId: this.config.id });
                this.toggleEdit();
            },
        },
    };
</script>
