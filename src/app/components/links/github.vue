<template>
    <a target="_blank" :href="url">{{ $t('message.vcs_link_text') }}</a>
</template>

<script>
    export default {
        props: {
            username: {
                type: String,
                required: true,
            },
            project: {
                type: String,
                required: true,
            },
        },
        computed: {
            url() {
                return `https://github.com/${ this.username }/${ this.project }`;
            },
        },
    };
</script>
