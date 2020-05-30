<template>
    <v-footer app
            color="primary">
        <small class="navigation--version">v{{ version }}</small>
        <v-spacer/>
        <div>&copy; {{ new Date().getFullYear() }}</div>
        <v-spacer/>
    </v-footer>
</template>

<script>
    import { repository, version } from '../../../../../../package.json';

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
