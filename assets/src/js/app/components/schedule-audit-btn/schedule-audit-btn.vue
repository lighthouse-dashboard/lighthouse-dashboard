<template>
    <btn
            :facets="['primary', 'full-width', ...auditBtnFacet]"
            @click="runAudit">
        <template v-if="isScheduled">
            {{ $t('site.audit-already-scheduled')}}
        </template>
        <template v-else>
            {{ $t('site.schedule-new-audit-button') }}
        </template>
    </btn>
</template>

<script>
    import Toastify from 'toastify-js';
    import { mapActions } from 'vuex';
    import catchError from '../../utils/catch-error';
    import Btn from '../base/btn/btn';

    export default {
        components: { Btn },
        props: {
            id: {
                type: String,
                required: true,
            },

            hasScheduledJobs: {
                type: Boolean,
                default: false,
            },
        },

        data: () => ({
            jobHasBeenScheduled: false,
        }),

        computed: {
            isScheduled() {
                return this.jobHasBeenScheduled || this.hasScheduledJobs;
            },
            auditBtnFacet() {
                return [
                    this.isScheduled ? 'disabled' : 'base',
                ];
            },
        },

        methods: {
            ...mapActions('reports', ['launchAuditForSite']),
            runAudit() {
                this.launchAuditForSite({ id: this.id })
                    .then(() => {
                        this.jobHasBeenScheduled = true;
                        Toastify({
                            text: this.$t('site.audit-scheduled-notification-text'),
                            className: 'info',
                        })
                            .showToast();
                        this.isAuditScheduled = true;
                    })
                    .catch(catchError);
            },
        },
    };
</script>
