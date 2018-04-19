<template>
    <div>
        <div class="navbar-fixed">
            <nav class="green lighten-1">
                <div class="nav-wrapper">

                    <ul class="">
                        <router-link
                            tag="li"
                            activeClass="active"
                            :to="{name: 'overview', params: {vcs, username, project}, query: $route.query}"
                            :exact="true">
                            <a>{{ $t("message.overview") }}</a>
                        </router-link>

                        <router-link
                            activeClass="active"
                            tag="li"
                            :to="{name: 'history', params: {vcs, username, project}, query: $route.query}"
                            :exact="true">
                            <a>{{ $t("message.history") }}</a>
                        </router-link>
                    </ul>
                </div>
            </nav>
        </div>

        <div class="row">
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {

        props: {
            vcs: {
                type: String,
                required: true,
            },
            username: {
                type: String,
                required: true,
            },
            project: {
                type: String,
                required: true,
            },
        },
    };
</script>
