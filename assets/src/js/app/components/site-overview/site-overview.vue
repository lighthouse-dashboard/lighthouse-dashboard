<template>
    <tile class='site-overview'>
        <div class='site-overview--title'
                slot="title">
            <btn :to="{name: 'project.detail', params: {id}}"
                    class="subtitle1"
                    facet="flat">
                {{ name }}
            </btn>
        </div>

        <project-settings v-if="showSettings"
                :id="id"
                @close="onSettingsClosed"/>

        <div class='site-overview--content'>
            <span v-if="runError">{{ runError.message }}</span>
            <line-chart
                    :data-sets="datasets"
                    :labels="labels"/>
        </div>
    </tile>
</template>

<script>
    import { mapActions } from 'vuex';
    import { customProjectMenuEntries } from '../../../../../../config/dashboard';
    import Btn from '../base/btn/btn';
    import LineChart from '../charts/line-chart/line-chart';
    import ProjectSettings from '../site-settings/site-settings';
    import Tile from '../tile/tile';

    export default {
        components: {
            Tile,
            Btn,
            LineChart,
            ProjectSettings,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },

            is_favorite: {
                type: Boolean,
                required: true,
            },

            datasets: {
                type: Array,
                required: true,
            },
            labels: {
                type: Array,
                required: true,
            },
        },

        data() {
            return {
                showSettings: false,
                showInfo: false,
                chart: null,

                isLoading: false,
                runError: null,
                interval: null,
            };
        },
        computed: {
            menuEntries() {
                return customProjectMenuEntries.map((entry) => {
                    return {
                        name: entry.name,
                        link: entry.link(this.url),
                    };
                });
            },
        },
        methods: {
            ...mapActions('reports', ['fetchReportsForSite', 'launchAuditForSite']),
            ...mapActions('sites', ['deleteSite']),

            onSettingsClosed() {
                this.showSettings = false;
            },

            loadData() {
                this.isLoading = true;

            },

            async removePage() {
                await this.deleteSite({ id: this.id });
            },

            openSettings() {
                this.showSettings = !this.showSettings;
            },
            openInfo() {
                this.showInfo = !this.showInfo;
            },
        },
    };
</script>
