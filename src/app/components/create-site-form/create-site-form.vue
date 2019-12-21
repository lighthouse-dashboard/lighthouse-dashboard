<template>
    <div class="create-site-form">
        <input v-model="url"/>
        <input v-model="id"/>
        <input v-model="device"/>
        <button @click="onCreateClicked">Create</button>
    </div>
</template>

<script>
    import axios from 'axios';
    import { CREATE_SITE_URL } from '../../config/routes';

    export default {
        props: {},
        data() {
            return {
                url: 'https://www.exmaple.com',
                id: 'example.com',
                device: 'desktop',
            };
        },

        methods: {
            onCreateClicked() {
                axios.post(CREATE_SITE_URL, {
                    url: this.url,
                    id: this.id,
                    device: this.device,
                });
            },
        },
    };
</script>
