<template>
    <div class="tile">
        <div class="tile--title">
            <slot name="title">
                <p class="subtitle1">{{ title }}</p>
            </slot>
            <slot name="caption">
                <span class="u-reset caption tile--caption">{{ caption }}</span></slot>
        </div>
        <div class="tile--content">
            <slot/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
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
