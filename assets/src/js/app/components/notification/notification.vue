<template >
    <div class="notification"
         :class="rootFacets" >
        <unicon class="notification--icon"
                :name="icon" />
        <span class="u-reset notification--text" >
                <slot />
            </span >
    </div >
</template >

<script >
import bemMixin from '../../mixins/bem-mixin';

export default {
    mixins: [bemMixin( 'notification' )],
    props: {
        icon: {
            type: String,
            default: 'exclamation-triangle',
        },
    },
};
</script >
