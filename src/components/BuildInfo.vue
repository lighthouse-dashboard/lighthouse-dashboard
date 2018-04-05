<template>
  <div >
    <h1>#{{build_num}} - {{reponame}}</h1>
    <p>Completed: {{stop_time}}</p>
    <p>Branch: {{branch}}</p>
    <p>Author: {{author_name}} <img class='avatar' :src="userAvatar"/></p>
    <p >Artifacts: 
        <ul>
            <li v-for='html in htmlArtifacts' :key='html.url'>
                <a target='_blank' :href='html.url'>{{html.path}}</a>
            </li>
        </ul>
    </p>
  </div>
</template>

<script>
import path from "path";
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
    },

    data() {
        return {
            branch: null,
            reponame: null,
            author_name: null,
            stop_time: null,
            build_num: null,
            userAvatar: null,
            htmlArtifacts: []
        };
    },

    mounted() {
        const opt = {
            vcs: this.vcs,
            username: this.username,
            project: this.project,
            token: this.token
        };

        this.$circle.getBuildInfo(opt).then(data => {
            const {
                branch,
                reponame,
                author_name,
                build_num,
                stop_time,
                user
            } = data;
            this.branch = branch;
            this.stop_time = stop_time;
            this.reponame = reponame;
            this.author_name = author_name;
            this.build_num = build_num;
            this.userAvatar = user.avatar_url;
        });

        this.$circle.getHtmlArtifacts(opt).then(htmlArtifacts => {
            this.htmlArtifacts = htmlArtifacts;
        });
    }
};
</script>
<style scoped>
.avatar {
    max-width: 25px;
    max-height: 25px;
    border-radius: 25px;
}
</style>