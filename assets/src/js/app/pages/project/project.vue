<template>
    <div class='project'>
        <h4 class='h4 project--title'
                v-if="site">
            {{ site.name }}
        </h4>

        <site-create-overlay :config='site'
                v-if='site && isEdit'
                @updated='reload'
                @close='toggleEdit'/>

        <notification :facets="['success']"
                v-if="hasScheduledJobs">
            Audits are scheduled for this project
        </notification>

        <div class='project--content'>
            <div class='project--insights'>
                <div class='project--overview'>
                    <tile title="Latest Report"
                            class="project--last-report-radar">
                        <loading-indicator v-if='isLoading'/>
                        <radar-chart :series="latestReportRadarData.series"
                                :labels="latestReportRadarData.labels"
                                v-if='latestReportRadarData'/>
                    </tile>

                    <tile title="Averages"
                            class="project--average">
                        <loading-indicator v-if='isLoading'/>
                        <gauge-chart :labels="avgFields"
                                :series='avgFields.map(field => getAvg(field))'
                                v-else/>
                    </tile>
                </div>

                <report-history class='project--history'
                        :reports='reports'/>
            </div>

            <div class='project--sidebar'>
                <tile title="Settings"
                        class='project--sidebar-section'>
                    <loading-indicator v-if='isLoading'/>
                    <site-config :site="site"
                            v-if='site'/>
                </tile>

                <div class='project--sidebar-section'>
                    <btn :facets="['secondary', 'full-width']"
                            @click="toggleEdit">Edit
                    </btn>
                </div>

                <div class='project--sidebar-section'>
                    <btn :facets="['secondary', 'full-width', ...auditBtnFacet]"
                            @click="runAudit">
                        <template v-if="hasScheduledJobs">Audits already scheduled</template>
                        <template v-else>New audit</template>
                    </btn>
                </div>
                <div class='project--sidebar-section'>
                    <confirm-button :facets='["danger", "full-width"]'
                            confirm="Click to confirm"
                            @click='onDeleteClicked'>
                        Delete
                    </confirm-button>
                </div>

                <tile title='Tools'
                        class='project--sidebar-section'>
                    <site-actions-list
                            :url='site.url'
                            v-if='site'/>
                </tile>

                <tile title='HTML Reports'
                        class='project--sidebar-section'>
                    <audit-report-list :reports='reports'/>
                </tile>
            </div>
        </div>
    </div>
</template>

<script>
    import Toastify from 'toastify-js';
    import { mapActions } from 'vuex';
    import AuditReportList from '../../components/audit-report-list/audit-report-list';
    import Btn from '../../components/base/btn/btn';
    import ConfirmButton from '../../components/base/confirm-button/confirm-button';
    import LoadingIndicator from '../../components/base/loading-indicator/loading-indicator';
    import GaugeChart from '../../components/charts/gauge-chart/gauge-chart';
    import RadarChart from '../../components/charts/radar-chart/radar-chart';
    import Notification from '../../components/notification/notification';
    import SiteCreateOverlay from '../../components/overlay/site-create-overlay/site-create-overlay';
    import ReportHistory from '../../components/report-history/report-history';
    import SiteActionsList from '../../components/site-actions-list/site-actions-list';
    import SiteConfig from '../../components/site-config/site-config';
    import Tile from '../../components/tile/tile';
    import catchError from '../../utils/catch-error';
    import getAverageForScore from '../../utils/get-average-for-score';
    import reportToRadarChart from '../../utils/report-to-radar-chart';

    export default {
        components: {
            Notification,
            ConfirmButton,
            SiteCreateOverlay,
            AuditReportList,
            SiteActionsList,
            LoadingIndicator,
            Btn,
            RadarChart,
            Tile,
            GaugeChart,
            ReportHistory,
            SiteConfig,
        },

        props: {
            id: {
                type: String,
                required: true,
            },
            reports: {
                type: Array,
                default: () => [],
            },
            isLoading: {
                type: Boolean,
                default: false,
            },

            /** @type {Sites.SiteConfig | null} */
            site: {
                type: Object,
                default: null,
            },
        },

        data() {
            return {
                isEdit: false,
                isAuditScheduled: false,
                avgFields: ['Performance', 'SEO', 'Accessibility'],
            };
        },

        computed: {
            latestReport() {
                return this.reports[0];
            },

            hasScheduledJobs() {
                return (this.site && this.site.is_scheduled) || this.isAuditScheduled;
            },

            auditBtnFacet() {
                return [
                    this.hasScheduledJobs ? 'disabled' : 'base',
                ];
            },

            latestReportRadarData() {
                if (!this.latestReport) {
                    return null;
                }
                return reportToRadarChart(this.latestReport);
            },
        },

        methods: {
            ...mapActions('reports', ['launchAuditForSite']),
            ...mapActions('sites', ['deleteSite', 'getCurrentSite']),

            getAvg(scoreId) {
                return Math.round(getAverageForScore(this.reports, scoreId.toLocaleLowerCase()) * 100) / 100;
            },

            runAudit() {
                this.launchAuditForSite({ id: this.id })
                    .then(() => {
                        Toastify({
                            text: 'New audit scheduled',
                            className: 'info',
                        })
                            .showToast();
                        this.isAuditScheduled = true;
                    })
                    .catch(catchError);
            },

            onDeleteClicked() {
                this.deleteSite({ id: this.id })
                    .then(() => {
                        this.$router.push({ name: 'dashboard' });
                        Toastify({
                            text: 'Page deleted',
                            className: 'info',
                        })
                            .showToast();
                    })
                    .catch(catchError);
                ;
            },
            reload() {
                this.getCurrentSite({ siteId: this.id });
            },
            toggleEdit() {
                this.isEdit = !this.isEdit;
            },
        },

        mounted() {

        },
    };
</script>
