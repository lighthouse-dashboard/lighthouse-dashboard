<template>
    <div>
        <div class="navbar-fixed">
            <nav class="green lighten-1">
                <div class="nav-wrapper">
                    <router-link :to="{name: 'help'}" class="brand-logo center">
                        {{ $t("message.help")}}
                    </router-link>
                </div>
            </nav>
        </div>

        <div class="row">
            <div class="col s12">
                <div class="card">
                    <div class="card-content">
                        <div class="card-title">Add Project to dashboard</div>
                        <p>- Add the project to circleci. <a href="https://github.com/dreipol/dreipol-website/blob/master/.circleci/config.yml" target="_blank">Example Config</a></p>
                        <p>- Configure the project so it runs with <a
                            href="https://www.npmjs.com/package/@dreipol/lighthouse-runner" target="_blank">deihouse</a>
                        </p>
                        <p>- Make sure that the <i>dreipoldev</i> account has access to it (circleci & github)
</p>
                        <p>- Add the project to circleci</p>
                        <p>- Clear the cache in the dashboard
</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Vue from 'vue';

    export default {

        components: {},

        data() {
            return {
                password: null,
                isSubmitting: false
            };
        },

        methods: {}
    };
</script>
