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

                <v-list-item :href="config.url"
                        target="_blank">
                    <v-list-item-content>
                        <v-list-item-title>{{ config.url }}</v-list-item-title>
                        <v-list-item-subtitle>Url</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-icon>
                        <v-icon>mdi-open-in-new</v-icon>
                    </v-list-item-icon>
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
    </v-card>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        components: {},
        props: {
            /** @type {Sites.SiteConfig} */
            config: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {};
        },

        methods: {
            ...mapActions('sites', ['getCurrentSite']),
        },
    };
</script>
