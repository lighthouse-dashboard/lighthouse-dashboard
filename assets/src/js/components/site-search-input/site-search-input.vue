<template>
    <div class="site-search-input">
        {{ query }}
        <v-text-field v-model="query"/>
    </div>
</template>

<script>
    export default {
        props: {},
        data(){
            return {
                query: '',
            };
        },
    };
</script>
