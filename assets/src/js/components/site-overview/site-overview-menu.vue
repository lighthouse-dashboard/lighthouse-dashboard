<template>
    <v-menu offset-y
            z-index="20">
        <template v-slot:activator="{ on }">
            <v-btn
                    icon
                    v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list dense>
            <v-list-item @click="removePage">
                <v-list-item-title>
                    Remove
                </v-list-item-title>
            </v-list-item>

             <v-list-item @click="openSettings">
                <v-list-item-title>
                    Settings
                </v-list-item-title>
            </v-list-item>

            <v-list-item @click="runAudit">
                <v-list-item-title>
                    Run New Audit
                </v-list-item-title>
            </v-list-item>

            <template v-if="entries.length > 0">
                <v-subheader>Custom menus</v-subheader>
                <v-list-item
                        target="_blank"
                        :href="entry.link"
                        v-for="entry in entries"
                        :key="entry.name">
                    <v-list-item-title>
                        {{ entry.name }}
                    </v-list-item-title>
                </v-list-item>
            </template>
        </v-list>
    </v-menu>
</template>

<script>


    export default {
        props: {
            entries: {
                type: Array,
                required: true,
            },
        },
        methods: {
            removePage() {
                this.$emit('removePage');
            },

            runAudit() {
                this.$emit('runAudit');
            },

            openSettings() {
                this.$emit('openSettings');
            },
            openInfo() {
                this.$emit('openInfo');
            },
        },
    };
</script>
