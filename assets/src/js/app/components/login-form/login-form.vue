<template>
    <form class="login-form"
            @submit.prevent="onLogin">
        <h4>
            {{ title }}
        </h4>

        <div class='login-form--content'>
            <div class='login-form--input-wrapper'>
                {{ password }}
                <input-field
                        placeholder='Password'
                        type="password"
                        :value="password"
                        :error='errorMessage'
                        @input='onChange'
                />
            </div>
            <div>
                <btn @click="onLogin">
                    Login
                </btn>
            </div>
        </div>
    </form>
</template>

<script>
    import { mapActions } from 'vuex';
    import Btn from '../base/btn/btn';
    import InputField from '../base/input-field/input-field';

    export default {
        components: { InputField, Btn },
        props: {
            title: {
                type: String,
                required: true,
            },
        },

        data() {
            return {
                password: '',
                error: null,
                isLoading: false,
            };
        },

        computed: {
            errorMessage() {
                return this.error?.message;
            },
        },

        methods: {
            ...mapActions('login', ['doLogin']),

            onChange(val) {
                this.password = val;
            },

            async onLogin() {
                this.isLoading = true;
                try {
                    await this.doLogin({ password: this.password });
                    this.$router.push('/');
                    this.isLoading = false;
                } catch (e) {
                    this.error = e;
                }
                this.isLoading = false;
            },
        },
    };
</script>
