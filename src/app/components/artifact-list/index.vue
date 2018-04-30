<template>
    <div v-if="htmlArtifacts && htmlArtifacts.length > 0">
        <div class="collection with-header">
            <div class="collection-header">
                <h4>{{ $t("message.artifacts") }}</h4>
            </div>
            <a class="truncate collection-item"
               target="_blank"
               v-for="html in htmlArtifacts"
               :key="html.url"
               :href="html.url">
                {{ getFilename(html.path) }}
            </a>
        </div>
    </div>
</template>

<script>

    import Card from '@/components/cards/Card';
    import { basename } from 'path';

    export default {

        components: {
            Card,
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
                type: [String, Number],
                required: true,
            },
        },

        data() {
            return {
                htmlArtifacts: [],
            };
        },

        methods: {
            getFilename(path) {
                return basename(path);
            },
        },

        mounted() {
            this.$api
                .getArtifacts(this.vcs, this.username, this.project, this.buildnum)
                .then(htmlArtifacts => {
                    this.htmlArtifacts = htmlArtifacts;
                })
                .catch((e) => {
                    this.$toast.error(e);
                    if (e.status === 401) {
                        this.$auth.logout();
                        this.$router.push({ name: 'login' });
                    }
                });
        },
    };
</script>
