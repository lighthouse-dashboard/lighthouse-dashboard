<template>
    <v-content>
        <v-container>
            <v-row>
                <v-col cols="4"
                        offset="4">
                    <v-card :loading="isLoading">
                        <form @submit.prevent="onLogin">
                            <v-card-title>
                                Login
                            </v-card-title>
                            <v-card-text>
                                <v-text-field
                                        v-model="password"
                                        label="Password"
                                        type="password"
                                        :error="!!error"
                                        :error-messages="error && error.message"
                                />
                            </v-card-text>
                            <v-card-actions>
                                <v-btn align="right"
                                        @click="onLogin">
                                    Login
                                </v-btn>
                            </v-card-actions>
                        </form>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>
    </v-content>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
        props: {},

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
