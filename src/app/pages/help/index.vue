<template>
    <div>
        <div class="navbar-fixed">
            <nav class="green lighten-1">
                <div class="nav-wrapper">
                    <router-link :to="{name: 'help'}" class="brand-logo center">
                        {{ $t("message.help") }}
                    </router-link>
                </div>
            </nav>
        </div>

        <div class="row">
            <div class="col s12">
                <div class="card">
                    <div class="card-content">
                        <div class="card-title">Add new project</div>
                        <p>- Add the project to circleci. <a
                            href="https://github.com/dreipol/dreipol-website/blob/master/.circleci/config.yml"
                            target="_blank">Example Config</a></p>
                        <p>- Configure the project so it runs with <a
                            href="https://www.npmjs.com/package/@dreipol/lighthouse-runner"
                            target="_blank">dreihouse</a>
                        </p>
                        <p>- Modify the config files so they report your preferred paths and domains.</p>
                        <p>- Add the project to circleci</p>
                        <p>- Add <i>dreipoldev</i> as contributor on github(Only read rights are required)</p>
                        <p>- Make <i>dreipoldev</i> follow the project on circleCi</p>
                        <p>- Clear the cache in the dashboard</p>
                        <p>- HTTP Request are also cached, so it's a good idea to clear your browser cache too</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {

        components: {},

        data() {
            return {
                password: null,
                isSubmitting: false,
            };
        },
    };
</script>
