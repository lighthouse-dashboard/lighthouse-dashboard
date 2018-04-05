<template>
  <div >
    <p v-if="!artifacts">No Build Artifacts</p>
    <div v-for="artifact in artifacts" :key="artifact.path">
      <p v-if="!artifact">No Dashboard available</p>
      <ArtifactViewer v-if="artifact" :artifactUrl="artifact.url" :token="token"/>
    </div>   
  </div>
</template>

<script>
import path from "path";

import ArtifactViewer from "./ArtifactViewer";

export default {
    components: {
        ArtifactViewer
    },

    props: {
        vcs: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        project: {
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
            artifacts: []
        };
    },

    mounted() {
        this.$circle
            .getDashboardArtifacts({
                vcs: this.vcs,
                username: this.username,
                project: this.project,
                token: this.token
            })
            .then(artifacts => {
                this.artifacts = artifacts;
            });
    }
};
</script>
