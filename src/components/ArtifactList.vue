<template>
    <div class="collection with-header" v-if="htmlArtifacts && htmlArtifacts.length > 0">
        <div class="collection-header">
            <h6>{{ $t("message.artifacts") }}</h6>
        </div>
        <a v-for='html in htmlArtifacts'
           class="collection-item"
           :key='html.url'
           target='_blank'
           :href='html.url'>
            {{html.path}}
        </a>
    </div>
</template>

<script>

    export default {
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
            buildNum: {
                type: [String, Number],
                required: true
            },
        },

        data() {
            return {
                htmlArtifacts: [],
            };
        },

        mounted() {
            this.$circle
                .getHtmlArtifacts(this.vcs, this.username, this.project, this.buildNum)
                .then(htmlArtifacts => {
                    this.htmlArtifacts = htmlArtifacts;
                })
                .catch((e) => {
                    this.$toast.error(e);
                    if (e.status === 401) {
                        this.$auth.logout();
                        this.$router.push({ name: 'login' });
                    }
                })
        }
    };
</script>
