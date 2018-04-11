<template>
    <div>
        <p v-if="!artifacts">{{ $t("message.no_dashboard_available") }}</p>
        <div v-for="artifact in artifacts" :key="artifact.path">
            <p v-if="!artifact">{{ $t("message.no_dashboard_available") }}</p>
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
            return {};
        },

    };
</script>
