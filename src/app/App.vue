<template>
    <div class="columns">
        <div class="column is-half"
                v-for="site in sites"
                :key="site.id">
            <chart v-bind="site"/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import Chart from './components/chart/chart';

    export default {
        components: {
            Chart,
        },
        data() {
            return {
                sites: [],
            };
        },
        mounted() {
            axios.get('/api')
                .then(({ data }) => {
                    this.sites = data;
                });
        },
    };
</script>
