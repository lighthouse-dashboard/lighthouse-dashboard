<template>
    <div class="col s12">
        <div class="card-panel grey lighten-5 z-depth-1">
            <div class="valign-wrapper">
                <div class="col s2">
                    <img :src="useravatar" :alt="username" class="circle responsive-img">
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
