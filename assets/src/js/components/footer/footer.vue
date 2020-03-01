<template>
    <v-container>
        <v-footer app
                absolute
                tile>
            <a :href="repository.url">
                v{{ version }}
            </a>
            <v-spacer/>
            <div>&copy; {{ new Date().getFullYear() }}</div>
            <v-spacer/>
        </v-footer>
    </v-container>
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
