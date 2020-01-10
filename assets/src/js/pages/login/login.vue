<template>
    <v-content>
        <v-container>
            <v-row>
                <v-col>
                    <h1>Login</h1>
                </v-col>
                <v-col>
                    <v-text-field
                            v-model="password"
                            label="Password"
                            type="password"
                            :error="!!error"
                            :error-messages="error && error.message"
                    />
                    <v-btn align="right"
                            @click="onLogin">
                        Login
                    </v-btn>
                </v-col>
            </v-row>

        </v-container>
    </v-content>
</template>

<script>
    import { mapActions } from 'vuex';
    import { AUTH_URL } from '../../config/routes';
    import axios from '../../utils/axios';

    export default {
        props: {},

        data() {
            return {
                password: '',
                error: null,
            };
        },
        methods: {
            ...mapActions('login', ['setJwt', 'setLoggedIn']),
            async onLogin() {
                try {
                    const { data } = await axios().post(AUTH_URL, { password: this.password });
                    await this.setJwt({ jwt: data.jwt });
                    await this.setLoggedIn({ isLoggedIn: true });
                    this.$router.push('/');
                } catch (e) {
                    this.error = e;
                }
            },
        },
    };
</script>
