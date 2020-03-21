<template>
    <v-footer app
            color="primary">
        <v-spacer/>
        <div>&copy; {{ new Date().getFullYear() }}</div>
        <v-spacer/>
    </v-footer>
</template>

<script>
    import { repository, version } from '../../../../../package.json';

    export default {
        props: {},
        data() {
            return {
                version,
                repository,
            };
        },
    };
</script>
