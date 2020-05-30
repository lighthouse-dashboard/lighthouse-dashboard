<template>
    <a v-bind='$attrs'
            class="link">
        <slot/>
    </a>
</template>

<script>
    export default {
        props: {},
    };
</script>
