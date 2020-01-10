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
        <v-list>
            <v-list-item>
                <v-list-item-title>
                    Open Page
                </v-list-item-title>
            </v-list-item>
            <v-list-item @click="openSettings">
                <v-list-item-title>
                    Settings
                </v-list-item-title>
            </v-list-item>
            <v-list-item @click="removePage">
                <v-list-item-title>
                    Remove Site
                </v-list-item-title>
            </v-list-item>
            <v-list-item @click="runAudit">
                <v-list-item-title>
                    Run New Audit
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>

    export default {
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
        },
    };
</script>
