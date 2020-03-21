<template>
    <div class="site-search-input">
        <v-text-field
                v-model="query"
                placeholder="Search for name or url"
                prepend-inner-icon="mdi-magnify"
                solo/>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        props: {},
        data() {
            return {
                query: '',
            };
        },
        methods: {
            ...mapActions('sites', ['searchForPages', 'fetchAllSites']),
        },

        watch: {
            query(v) {
                if (!v) {
                    this.fetchAllSites();
                    return;
                }

                this.searchForPages({ query: v });
            },
        },
    };
</script>
