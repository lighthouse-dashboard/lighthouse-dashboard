<template>
    <div>
        <v-btn
                fab
                icon
                @click.stop="dialog = true"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>

        <v-dialog
                v-model="dialog"
                max-width="320"
        >
            <v-card>
                <v-card-title class="headline">
                    Add new project
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col cols="12"
                                sm="12">
                            <v-text-field
                                    v-model="id"
                                    label="ID"
                                    required
                            />
                            <v-text-field
                                    v-model="url"
                                    label="URL"
                                    required
                            />
                            <v-select
                                    v-model="device"
                                    :items="items"
                                    label="Device"
                                    required
                            />
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            text
                            @click="dialog = false"
                    >
                        Cancel
                    </v-btn>

                    <v-btn
                            text
                            @click="onCreateClicked"
                    >
                        Add
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>

</template>

<script>
    import { mapActions, mapState } from 'vuex';

    export default {
        props: {},
        data() {
            return {
                dialog: false,
                url: 'https://www.exmaple.com',
                id: 'example.com',
                device: 'desktop',
                items: [
                    {
                        text: 'Desktop',
                        value: 'desktop',
                    }, {
                        text: 'Mobile',
                        value: 'mobile',
                    },
                ],
            };
        },
        computed: {
            ...mapState('login', ['jwt']),
        },
        methods: {
            ...mapActions('sites', ['createSite']),

            async onCreateClicked() {
                await this.createSite({
                    url: this.url,
                    id: this.id,
                    device: this.device,
                });
                this.dialog = false;
            },
        },
    };
</script>
