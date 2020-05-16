<template>
    <div class="tile">
        <div class="tile--title">
            <slot name="title">
                <p class="subtitle1">{{ title }}</p>
            </slot>
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
        },
    };
</script>
