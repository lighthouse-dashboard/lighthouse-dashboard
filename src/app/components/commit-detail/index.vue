<template>
    <div class="row commit-detail">
        <div class="col s12">
            {{ username }}
        </div>
        <div class="col s12">
            {{ commitmessage }}
        </div>
    </div>
</template>

<script>

    export default {

        components: {},

        props: {
            username: {
                type: String,
                required: true,
            },
            commitmessage: {
                type: String,
                default: null
            },
            useravatar: {
                type: String,
                required: true,
            },
        },
    };
</script>
