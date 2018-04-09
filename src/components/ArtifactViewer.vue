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

    mounted() {
        this.load();
    },

    methods: {
        load() {
            this.$circle.getArtifact(this.artifactUrl)
                .then( resp => {
                    console.log(resp);
                })
        }
    }
};
</script>

<style scoped>
    iframe {
        border: none;
        width: 100%;
        height: 420px;
    }
</style>
