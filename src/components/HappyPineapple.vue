<template>
    <div class="pineapple-wrapper">
        <div class="pineapple" :style="{width: size*0.8+'px', height: size+'px'}">
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
    </div>
</template>

<script>
    export default {
        props: {
            size: {
                type: Number,
                default: 200
            }
        }
    }
</script>
