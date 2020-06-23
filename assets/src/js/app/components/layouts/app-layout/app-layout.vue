<template>
    <div class="app-layout">
        <slot name='navigation'/>

        <div class="app-layout--content-wrapper">
            <div class='app-layout--content'>
                <slot name='content'/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {},
    };
</script>
