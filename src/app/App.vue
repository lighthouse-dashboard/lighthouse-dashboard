<template>
    <div>
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        dreipol
                    </h1>
                    <h2 class="subtitle">
                        page quality dashboard
                    </h2>
                </div>
            </div>
        </section>

        <div class="container">
            <div class="columns">
                <div class="column is-half">
                    <speed-overview/>
                </div>
            </div>
        </div>

        <div class="container is-fluid">
            <div class="columns is-desktop">
                <div class="column is-half"
                        v-for="site in sites"
                        :key="site.id">
                    <site-overview v-bind="site"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import SiteOverview from './components/site-overview/site-overview.vue';
    import SpeedOverview from './components/speed-overview/speed-overview.vue';

    export default {
        components: {
            SpeedOverview,
            SiteOverview,
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
