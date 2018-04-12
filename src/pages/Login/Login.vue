<template>
    <div class="container">
        <div class="row">
            <div class="input-field col s12">
                <input id="password" type="password" class="validate" v-model="password">
                <label for="password">{{ $t('message.password') }}</label>
            </div>
            <div class="col s12">
                <a class="waves-effect waves-light btn" @click="submit">{{ $t('message.login') }}</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

        components: {},

        data() {
            return {
                password: null
            };
        },

        methods: {
            submit() {
                this.$auth.login(this.password)
                    .then( () => {
                        this.$toast.notify(this.$t('message.login_succeed'));
                        this.$router.push({name: 'dashboard'})
                    })
                    .catch(e => {
                        this.$toast.notify(this.$t('error.login_failed'))
                    })
            }
        }
    };
</script>
