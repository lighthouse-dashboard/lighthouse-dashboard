<template>
    <div class="notification"
            :class="rootFacets">
        <span class="u-reset notification--content">
            <unicon class="notification--icon"
                    :name="icon"/>
            <p class="u-reset notification--text">
                <slot/>
            </p>
        </span>
    </div>
</template>

<script>
    import bemMixin from '../../mixins/bem-mixin';

    export default {
        mixins: [bemMixin('notification')],

        data: () => ({
            iconMap: {
                warning: 'exclamation-triangle',
            },
        }),

        computed: {
            icon() {
                return this.iconMap[this.facet] || null;
            },
        },
    };
</script>
