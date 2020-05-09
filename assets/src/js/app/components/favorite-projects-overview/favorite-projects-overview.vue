<template>
    <div class='favorite-project-overview'>
        <section-header>
            Projects
        </section-header>

        <div class='favorite-project-overview--content'>
            <site-overview
                    v-for="site in sites"
                    :key="site.id"
                    v-bind="site"/>
        </div>
    </div>
</template>

<script>
    import CONFIG from '../../../../../../config/dashboard';
    import SectionHeader from '../section-header/section-header';
    import SiteOverview from '../site-overview/site-overview.vue';

    export default {
        components: {
            SectionHeader,
            SiteOverview,
        },
        props: {
            sites: {
                type: Array,
                required: true,
            },
        },
        computed: {
            cols() {
                return CONFIG.favoriteProjectsOverview.colSize;
            },
        },
    };
</script>
