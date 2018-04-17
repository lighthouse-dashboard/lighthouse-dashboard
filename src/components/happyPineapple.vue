<template>
    <div class="pineapple" :style="{width: height*0.8+'px', height: height+'px'}">
        <div class="leaf middle"></div>
        <div class="leaf left"></div>
        <div class="leaf right"></div>
        <div class="shadow"></div>
        <div class="body">
            <div class="eye left"></div>
            <div class="eye right"></div>
            <div class="mouth"></div>
            <div class="arm left"></div>
            <div class="arm right"></div>
            <div class="leg left"></div>
            <div class="leg right"></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            height: {
                type: Number,
                default: 200
            }
        }
    }
</script>
