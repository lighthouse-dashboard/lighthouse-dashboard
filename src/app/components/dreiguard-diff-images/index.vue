<template>
    <div class="row">
        <div class="col s12" v-for="img in comparison.compareFiles" :class="'m'+12/comparison.compareFiles.length" :key="img">
            <img :src="img"/>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            comparison: {
                type: Object,
                required: true,
            },
        },
    };
</script>
