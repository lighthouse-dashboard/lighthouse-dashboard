<template>
  <div>
    <iframe :src="artifactUrl" />
  </div>
</template>

<script>
import Chart from "./Chart.vue";

export default {
    components: {
        Chart
    },

    props: {
        artifactUrl: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            reportCategories: null,
            url: null,
            score: null
        };
    },

    mounted() {},

    methods: {}
};
</script>

<style scoped>
iframe {
    border: none;
    width: 100%;
    height: 380px;
}
</style>
