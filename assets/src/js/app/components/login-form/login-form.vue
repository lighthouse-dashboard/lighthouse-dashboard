<template>
    <form class="login-form"
            @submit.prevent="onLogin">
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-text>
            <input
                    v-model="password"
                    type="password"
                    :error="!!error"
                    :error-messages="error && error.message"/>
        </v-card-text>
        <v-card-actions>
            <v-btn align="right"
                    @click="onLogin">
                Login
            </v-btn>
        </v-card-actions>
    </form>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
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
        methods: {
            ...mapActions('login', ['doLogin']),

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
