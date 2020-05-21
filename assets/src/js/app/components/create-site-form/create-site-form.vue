<template>
    <div>
        <btn facets='primary'
                @click.stop="dialog = true">Add
        </btn>

        <v-dialog
                v-model="dialog"
                max-width="320">
            <v-card>
                <v-card-title class="headline">
                    Add new project
                </v-card-title>

                <v-card-text>
                    <v-row>
                        <v-col cols="12"
                                sm="12">
                            <v-text-field
                                    v-model="name"
                                    label="name"
                                    color="secondary"
                                    required/>
                            <v-text-field
                                    v-model="url"
                                    label="URL"
                                    color="secondary"
                                    required/>
                            <v-select
                                    v-model="device"
                                    :items="items"
                                    label="Device"
                                    color="secondary"
                                    required/>
                            <v-checkbox
                                    v-model="is_favorite"
                                    color="secondary"
                                    label="Is favorite"/>
                        </v-col>
                    </v-row>
                </v-card-text>

                <v-card-actions>
                    <v-spacer/>
                    <v-btn text
                            @click="dialog = false">
                        Cancel
                    </v-btn>

                    <v-btn text
                            color="secondary"
                            @click="onCreateClicked">
                        Add
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import Btn from '../base/btn/btn';

    export default {
        components: { Btn },
        props: {},
        data() {
            return {
                dialog: false,
                url: 'https://www.exmaple.com',
                name: 'example.com',
                device: 'desktop',
                is_favorite: false,
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
        methods: {
            ...mapActions('sites', ['createSite']),

            async onCreateClicked() {
                await this.createSite({
                    url: this.url,
                    name: this.name,
                    device: this.device,
                    is_favorite: this.is_favorite,
                });
                this.dialog = false;
            },
        },
    };
</script>
