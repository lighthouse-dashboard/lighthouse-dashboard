<template>
    <div>
        <div v-if="!dreiguard || dreiguard.length === 0">
            <p>{{ $t("message.no_info_available" )}}</p>
        </div>

        <dreiguard-images v-if="selectedComparison" :comparison="selectedComparison" />
        <div v-if="dreiguard && dreiguard.length > 0">
            <div v-for="(artifactData, index) in dreiguard" :key="index">
                <div v-for="(compare, index2) in artifactData" :key="index2">
                    <dreiguard-diff :comparison="compare" @select="onSelect"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import DreiguardDiff from '@/components/dreiguard-diff-result';
    import DreiguardImages from '@/components/dreiguard-diff-images';

    export default {
        components: {
            DreiguardDiff,
            DreiguardImages,
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
                        console.log(data);
                    });
            },
            onSelect(data){
                this.selectedComparison = data;
            },
        },

        mounted() {
            this.load();
        }
    };
</script>
