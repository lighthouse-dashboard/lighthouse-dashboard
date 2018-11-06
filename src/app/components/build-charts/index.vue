<template>
    <div class="build-charts" v-if="chartData">
        <div class="row">
            <div class="col s12"
                 v-for="(data, key) in chartData"
                 :key="key">
                <p>
                    <a target="_blank" :href="key">
                        {{ key }} 1
                    </a>
                </p>

                <chart
                    type="bar"
                    :columns="data"
                    :categories="categories"
                    :showx="true"
                    :height="height"/>
            </div>
        </div>
    </div>
</template>

<script>
    import Chart from '@/components/chart';

    export default {
        components: {
            Chart,
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

            height: {
                type: Number,
                default: 340,
            },
        },

        data() {
            return {
                chartData: null,
                chartDataLength: null,
                categories: null,
                artifacts: null,
                computedClass: null,
            };
        },

        methods: {

            buildChartData(result) {
                this.categories = result.categories;
                this.chartData = result.columns;
                this.chartDataLength = Object.keys(this.chartData).length;
                this.computedClass = this.chartDataLength % 2 === 0 ? 'm6' : 'm12';
            },
        },

        mounted() {
            this.$api.getBuildChartDataInfo(this.vcs, this.username, this.project, this.buildnum)
                .then(this.buildChartData);
        },
    };
</script>
