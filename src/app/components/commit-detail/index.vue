<template>
    <div class="commit-detail">
        <div class="commit-detail__avatar-wrapper">
            <img class="commit-detail__avatar" :src="useravatar" :alt="username"/>
        </div>

        <div class="commit-detail__message" :title="commitmessage">
            <p class="truncate">{{ commitmessage }}</p>
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
