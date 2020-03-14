<template>
    <v-card>
        <v-card-title>Tools</v-card-title>
        <v-card-text>
            <v-list class="site-actions-list">
                <v-list-item
                        target="_blank"
                        :href="entry.link"
                        v-for="entry in menuEntries"
                        :key="entry.name">
                    <v-list-item-title>
                        {{ entry.name }}
                    </v-list-item-title>
                    <v-list-item-icon>
                        <v-icon>mdi-open-in-new</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script>
    import { PROJECT_MENU_CUSTOM_ENTRIES } from '../../../../../config/dashboard';

    export default {
        props: {
            url: {
                type: String,
                required: true,
            },
        },
        computed: {
            menuEntries() {
                return PROJECT_MENU_CUSTOM_ENTRIES.map((entry) => {
                    return {
                        name: entry.name,
                        link: entry.link(this.url),
                    };
                });
            },
        },
    };
</script>
