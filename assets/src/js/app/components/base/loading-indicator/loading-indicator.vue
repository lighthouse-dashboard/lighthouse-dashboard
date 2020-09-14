<template>
    <div class="loading-indicator"
            :class="rootFacets">
        <div class="loading-indicator--bar"/>
        <div class="loading-indicator--bar"/>
        <div class="loading-indicator--bar"/>
        <div class="loading-indicator--bar"/>
    </div>
</template>

<script>
    import bemMixin from '../../../mixins/bem-mixin';

    export default {
        mixins: [bemMixin('loading-indicator')],
    };
</script>
