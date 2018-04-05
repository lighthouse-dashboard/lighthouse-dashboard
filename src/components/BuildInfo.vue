<template>
  <div>
    <h2><small>#{{build_num}}</small> {{reponame}}</h2>
    <div>
      <ul class="collection">
        <li class="collection-item avatar">
          <img :src="userAvatar" alt="" class="circle">
          <span class="title">{{author_name}}</span>
          <div>Branch: <span class='chip'>{{branch}}</span> <br>
            Completed: {{stop_time}}
          </div>
        </li>
      </ul>
    </div>
    <div>
      <div class="collection with-header">
        <div class="collection-header"><h6>Artifacts</h6></div>
        <a v-for='html in htmlArtifacts' class="collection-item" :key='html.url' target='_blank' :href='html.url'>{{html.path}}</a>
      </div>
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
