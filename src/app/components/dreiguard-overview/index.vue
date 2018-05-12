<template>
    <div>
        <div v-if="!dreiguard || dreiguard.length === 0">
            <p>{{ $t("message.no_info_available" )}}</p>
        </div>

        <div v-if="dreiguard && dreiguard.length > 0">
            <div v-for="(artifactData, index) in dreiguard" :key="index">
                <div class="col s6" v-for="(compare, index2) in artifactData" :key="index2">
                    <div class="card">
                        <div class="card-content">
                            <div class="card-title"><dreiguard-diff-result-title :comparison="compare"/></div>
                            <dreiguard-diff-result :comparison="compare"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import DreiguardDiffResultTitle from '@/components/dreiguard-diff-result-title';
    import DreiguardDiffResult from '@/components/dreiguard-diff-result';

    export default {
        components: {
            DreiguardDiffResult,
            DreiguardDiffResultTitle
        },
        props: {
            vcs: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            project: {
                type: String,
                required: true,
            },
            buildnum: {
                type: Number,
                required: true,
            },
        },

        data() {
            return {
                dreiguard: null,
                selectedComparison: null
            };
        },

        methods: {
            load() {
                this.$api.getDreiguardData(this.vcs, this.username, this.project, this.buildnum)
                    .then(data => {
                        this.dreiguard = data;
                    });
            },
            onSelect(data) {
                this.selectedComparison = data;
            },
        },

        mounted() {
            this.load();
        }
    };
</script>
