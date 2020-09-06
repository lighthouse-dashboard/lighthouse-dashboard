<template>
    <div class="tile">
        <div class="tile--title">
            <div class="tile--title-left-wrapper">
                <div class="tile--icon">
                    <unicon
                            :name="icon"
                            v-if="icon"
                    />
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
    </div>
</template>

<script>
    export default {
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
