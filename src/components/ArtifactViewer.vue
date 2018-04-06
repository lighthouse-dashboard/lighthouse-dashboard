<template>
  <div>
    <iframe :src="artifactUrl" />
  </div>
</template>

<script>

export default {
    props: {
        artifactUrl: {
            type: String,
            required: true
        },
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
    height: 420px;
}
</style>
