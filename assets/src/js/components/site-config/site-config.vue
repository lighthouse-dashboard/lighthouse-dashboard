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
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        props: {
            /** @type {SiteConfig} */
            config: {
                type: Object,
                required: true,
            },
        },
    };
</script>
