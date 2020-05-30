<template>
    <div class="app-layout">
        <div>
            <slot name='sidebar'/>
        </div>

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
