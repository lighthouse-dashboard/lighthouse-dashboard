<template>
    <div>
        <div class="navbar-fixed">
            <nav class="green lighten-1">
                <div class="nav-wrapper">
                    <router-link :to="{name: 'index'}" class="brand-logo center">
                        {{username}}/{{project}}
                    </router-link>

                    <ul class="left">
                        <router-link
                            :to="{name: 'project', params: {vcs, username, project, token}}"
                            tag="li"
                            :exact="true"
                            activeClass="active">
                            <a>Overview</a>
                        </router-link>

                        <router-link
                            :to="{name: 'history', params: {vcs, username, project, token}}"
                            tag="li"
                            :exact="true"
                            activeClass="active">
                            <a>History</a>
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
                required: true
            },
            username: {
                type: String,
                required: true
            },
            project: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }
    };
</script>
