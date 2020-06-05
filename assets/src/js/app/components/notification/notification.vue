<template>
    <div class="notification"
            :class="rootFacets">
        <span class="u-reset notification--content">
            <slot/>
        </span>
    </div>
</template>

<script>
    import bemMixin from '../../mixins/bem-mixin';

    export default {
        mixins: [bemMixin('notification')],
    };
</script>
