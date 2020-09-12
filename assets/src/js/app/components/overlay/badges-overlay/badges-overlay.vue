<template>
    <overlay :title="$t('badges.overlay-title')"
            :active="isActive"
            class="badges-overlay"
            :tile-props="{icon: 'award'}"
            v-on="$listeners">
        <img :src="`/api/sites/${ siteId }/badge`"/>
        <p class="caption badges-overlay--title">
            Markdown
        </p>
        <textarea class="caption badges-overlay--textarea"
                rows="5">
[![LH Status]({{protocol}}//{{host}}/api/sites/{{siteId}}/badge)]({{protocol}}//{{host}}/app/projects/{{siteId}})
        </textarea>

        <p class="caption badges-overlay--title">
            IFrame
        </p>
        <code class="caption">
            <textarea class="caption badges-overlay--textarea"
                    rows="5"><iframe src="{{ protocol }}//{{ host }}/api/sites/{{ siteId }}/badge?type=html"
                    height="24px"></iframe></textarea>
        </code>
    </overlay>
</template>

<script>
    import Overlay from '../overlay';

    export default {
        components: { Overlay },
        props: {
            siteId: {
                type: String,
                required: true,
            },
            isActive: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            host() {
                return window.location.host;
            },
            protocol() {
                return window.location.protocol;
            },
        },
    };
</script>
