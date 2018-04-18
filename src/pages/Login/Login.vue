<template>
    <div class="component">
        <div class="aux-lockdown">
            <div class="aux-lockdown--wrap">
                <div class="aux-lockdown--wrap-outer aux-lockdown--logosection">
                    <div class="aux-lockdown--wrap-inner">
                        <a href="http://dreipol.ch" target="_blank" tabindex="3" rel="noopener noreferrer">
                            <img class="aux-lockdown--logo" src="/static/dreipol_logo.svg" alt="dreipol">
                        </a>
                    </div>
                </div>

                <div class="aux-lockdown--wrap-outer aux-lockdown--content">
                    <div class="aux-lockdown--wrap-inner">
                        <h1 class="aux-lockdown--title">{{ $t("login.title") }}</h1>

                        <p class="aux-lockdown--description" v-html="$t('login.lead')"></p>

                        <div class="aux-lockdown--field">
                            <input type="password"
                                   tabindex="1"
                                   name="password"
                                   id="id_password"
                                   v-model="password"
                                   :placeholder="$t('login.password')">

                            <button type="submit" class="aux-lockdown--submit" tabindex="2" @click="submit">
                                <img src="/static/lockdown/arrow.svg" alt="senden" class="arrow arrow__main">
                                <img src="/static/lockdown/arrow-hover.svg" alt="senden"
                                     class="arrow arrow__hover">
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';

    export default {

        components: {
        },

        data() {
            return {
                password: null,
                isSubmitting: false
            };
        },

        beforeRouteEnter: (to, from, next) => {
            if (Vue.auth.isAuthenticated()) {
                return next({ name: 'dashboard' });
            }
            return next();
        },

        methods: {
            submit() {
                this.isSubmitting = true;
                this.$auth.login(this.password)
                    .then(() => {
                        this.$toast.notify(this.$t('message.login_succeed'));
                        this.$router.push({ name: 'dashboard' })
                    })
                    .catch(e => {
                        this.$toast.notify(this.$t('error.login_failed'))
                    })
                    .finally(() => {
                        this.isSubmitting = false;
                    })
            }
        }
    };
</script>

<style scoped>

    .title {
        font-size: 4rem;
    }

    .logo {
        height: 83px;
    }

    .component {
        width: 100vw;
        height: 100vh;
        display: flex;

    }

    .wrapper {
        display: flex;
        flex-flow: column;
        height: 100%;
        justify-content: center;
        flex: 1 1 100%;
    }

    .card-image {
        padding-top: 20px;
    }

</style>
