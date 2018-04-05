<template>
    <div class="row" v-if="build">
        <h2>
            <router-link :to="{name: 'project', params: project}">
                <small>
                    #{{build.build_num}}
                </small>
                {{build.reponame}}
            </router-link>

        </h2>

        <div class="col s12 m6 l12">
            <ul class="collection">
                <li class="collection-item avatar">
                    <img :src="userAvatar" alt="" class="circle">
                    <b>User</b> {{user}}
                </li>

                <li class="collection-item">
                    <b>Commit</b> {{build.subject}}
                </li>

                <li class="collection-item">
                    <b>Branch</b> {{build.branch}}
                </li>

                <li class="collection-item">
                    <b>Completed</b> {{build.stop_time}}
                </li>

                <li class="collection-item">
                    <a :href="build.build_url" target="_blank">CircleCi</a>
                </li>

                <li class="collection-item">
                    <a :href="build.vcs_url" target="_blank">Repository</a>
                </li>
            </ul>
        </div>


        <div class="col s12 m6 l12">
            <div class="collection with-header">
                <div class="collection-header"><h6>Artifacts</h6></div>
                <a v-for='html in htmlArtifacts' class="collection-item" :key='html.url' target='_blank'
                   :href='html.url'>{{html.path}}</a>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        props: {

            project: {
                type: Object,
                required: true
            },
            build: {
                type: Object,
                required: true
            }
        },

        data() {
            return {
                branch: null,
                user: null,
                userAvatar: null,
                htmlArtifacts: []
            };
        },

        mounted() {
            const {
                user,
            } = this.build;

            this.user = user.login;
            this.userAvatar = user.avatar_url;

            this.$circle
                .getHtmlArtifacts(this.project, this.build.build_num)
                .then(htmlArtifacts => {
                    this.htmlArtifacts = htmlArtifacts;
                });
        }
    };
</script>
