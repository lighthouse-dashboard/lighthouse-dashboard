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
                            :to="{name: 'builds', params: {vcs, username, project}, query: $route.query}"
                            :exact="true">
                            <a>{{ $t("message.builds") }}</a>
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
            <div class="col s4">
                <card>
                    <span slot="title">{{ $t('message.project') }}</span>
                    {{ project }}
                </card>
            </div>

            <div class="col s4">
                <card>
                    <span slot="title">{{ $t('message.link') }}</span>
                    <ci-link :username="username" :project="project"/>
                </card>
            </div>


            <div class="col s4">
                <card>
                    <span slot="title">{{ $t('message.link') }}</span>
                    <git-hub-link :username="username" :project="project"/>
                </card>
            </div>
        </div>

        <div class="row">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Card from '@/components/cards/Card';

    import CiLink from '@/components/links/ci';
    import GitHubLink from '@/components/links/github';

    export default {
        components: {
            Card,
            CiLink,
            GitHubLink,
        },

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
