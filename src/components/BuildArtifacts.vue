<template>
    <div class="card">
        <div class="card-content">
            <div class="row">
                <p class="center"
                   v-if="!chartData">
                    {{ $t("message.no_dashboard_available") }}
                </p>

                <div class="col s12"
                     v-for="(data, key) in chartData"
                     :key="key">
                    <p>
                        <a target="_blank" :href="key">
                            {{ key }}
                        </a>
                    </p>

                    <chart
                        :columns="data.columns"
                        :categories="categories"
                        :height="height"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Chart from '@/components/Chart.vue';

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
            buildNum: {
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
            this.$circle.getBuildChartDataInfo(this.vcs, this.username, this.project, this.buildNum)
                .then(this.buildChartData);
        },
    };
</script>
