<template>
    <div class="commit-detail row">
        <div class=" col s12 m3">
            <img class="commit-detail__avatar" :src="useravatar" :alt="username"/>
        </div>

        <div class="commit-detail__message col s12 m9 truncate" :title="commitmessage">
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
                required: true,
            },
            useravatar: {
                type: String,
                required: true,
            },
        },


    };
</script>
