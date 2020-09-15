<template>
    <tile class="changelog"
            :facets="['no-icon', 'no-padding']"
            :title="$t('changelog.title')">
        <div v-html="markdown"/>
    </tile>
</template>

<script>
    import MarkdownIt from 'markdown-it';
    import markdown from '../../../../../../CHANGELOG.md';
    import Tile from '../tile/tile';

    export default {
        components: { Tile },
        data() {
            return {
                markdown: null,
            };
        },

        mounted() {
            const md = new MarkdownIt({ html: true, });
            this.markdown = md.render(markdown);
        },
    };
</script>
