<template>
    <div class="tile"
            :class="rootFacets">
        <div class="tile--title">
            <div class="tile--title-left-wrapper">
                <div class="tile--icon">
                    <unicon
                            :name="icon"
                            v-if="icon"/>
                </div>
                <slot name="title">
                    <p class="subtitle1">{{ title }}</p>
                </slot>
            </div>
            <slot name="caption">
                <span class="u-reset caption tile--caption">{{ caption }}</span></slot>
        </div>
        <div class="tile--content">
            <slot/>
        </div>

        <div class="tile--footer">
            <slot name="footer"/>
        </div>
    </div>
</template>

<script>
    import bemMixin from '../../mixins/bem-mixin';

    export default {
        mixins: [bemMixin('tile')],
        props: {
            icon: {
                type: String,
                default: null,
            },
            title: {
                type: String,
                default: '',
            },
            caption: {
                type: String,
                default: '',
            },
        },
    };
</script>
