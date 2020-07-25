<template>
    <div class="changelog">
        <tile :title="$t('changelog.title')">
            <p v-html="markdown"/>
        </tile>
    </div>
</template>

<script>
    import MarkdownIt from 'markdown-it';
    import markdown from '../../../../../../CHANGELOG.md';
    import Tile from '../tile/tile';

    export default {
        components: { Tile },
        data(){
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
