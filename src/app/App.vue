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
                <create-site-form/>
            </div>
        </section>

        <div class="container">
            <div class="columns">
                <div class="column is-full">
                    <speed-overview/>
                </div>
            </div>
        </div>

        <div class="container is-fluid">

            <div class="columns is-desktop"
                    v-for="(group, idx) in siteChunks"
                    :key="idx">
                <div class="column is-third"
                        v-for="site in group"
                        :key="site.id">
                    <site-overview v-bind="site"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CreateSiteForm from './components/create-site-form/create-site-form';
    import axios from 'axios';
    import chunk from 'lodash.chunk';
    import SiteOverview from './components/site-overview/site-overview.vue';
    import SpeedOverview from './components/speed-overview/speed-overview.vue';
    import { GET_SITES_URL } from './config/routes';

    export default {
        components: {
            CreateSiteForm,
            SpeedOverview,
            SiteOverview,
        },
        data() {
            return {
                sites: [],
            };
        },
        computed: {
            siteChunks() {
                return chunk(this.sites, 4);
            },
        },
        mounted() {
            axios.get(GET_SITES_URL)
                .then(({ data }) => {
                    this.sites = data;
                });
        },
    };
</script>
