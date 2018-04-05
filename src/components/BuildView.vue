<template>
  <div >
    <p v-if="!artifacts">No Build Artifacts</p>
    <div v-for="artifact in artifacts" :key="artifact.path">
      <p v-if="!artifact">No Dashboard available</p>
      <ArtifactViewer v-if="artifact" :artifactUrl="artifact.url"/>
    </div>
  </div>
</template>

<script>
import ArtifactViewer from "./ArtifactViewer";

export default {
    components: {
        ArtifactViewer
    },

    props: {

        artifacts: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
        };
    },

};
</script>
