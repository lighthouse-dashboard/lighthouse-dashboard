<template>
  <div>
    <div ref="chart"></div>
  </div>
</template>

<script>
import billboard from "billboard.js";

export default {
    components: {},

    props: {
        data: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            chart: null,
            categories: null
        };
    },

    mounted() {
        this.categories = this.data.map(item => {
            return item.name;
        });

        this.buildChart();
    },

    methods: {
        buildChart() {
            this.chart = billboard.generate({
                data: {
                    json: this.data,
                    keys: {
                        value: ["score"]
                    },
                    type: "bar",
                    labels: true
                },
                axis: {
                    x: {
                        type: "category",
                        categories: this.categories
                    },
                    y: {
                        show: false,
                        label: "Score",
                        max: 100,
                        min: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                legend: {
                    show: false
                },
                color: {
                    pattern: ["#607D8B"],
                    threshold: {
                        value: [30, 90]
                    }
                },
                bindto: this.$refs.chart
            });
        }
    }
};
</script>
