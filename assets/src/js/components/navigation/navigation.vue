<template>
    <v-navigation-drawer v-model="drawer"
            :mini-variant.sync="mini"
            app>
        <v-list dense>
            <v-list-item v-if="!mini">
                <v-list-item-title>
                    {{ title }}
                    <small>v{{ version }}</small>
                </v-list-item-title>

                <v-btn icon
                        @click.stop="mini = !mini">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <v-divider v-if="!mini"/>

            <v-list-item to="/dashboard"
                    color="primary"
                    link>
                <v-list-item-action>
                    <v-icon>mdi-clipboard-pulse</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/overview"
                    color="primary"
                    link>
                <v-list-item-action>
                    <v-icon>mdi-table</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Projects Overview</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item to="/projects"
                    color="primary"
                    link>
                <v-list-item-action>
                    <v-icon>mdi-file-search-outline</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>Search</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    import { name, version } from '../../../../../package.json';

    export default {
        data() {
            return {
                drawer: true,
                mini: true,
                version,
                name,
            };
        },
    };
</script>
