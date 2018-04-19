<template>
    <a target="_blank" :href="url">{{ $t('message.circleci_link_text') }}</a>
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
                return `https://circleci.com/gh/${ this.username }/${ this.project }`;
            },
        },
    };
</script>
