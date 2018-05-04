<template>
    <div class="col s12 commit-detail">
        <div class="card-panel grey lighten-5 z-depth-1">
            <div class="valign-wrapper">
                <div class="col s2">
                    <img class="circle responsive-img commit-detail__avatar" :src="useravatar" :alt="username">
                </div>
                <div class="col s10">
                    <div class="black-text">
                        {{ username }}<br>
                        <span class="truncate">
                        {{ commitmessage }}
                      </span>
                    </div>
                </div>
            </div>
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
