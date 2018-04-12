import Vue from 'vue';

const STORE_KEY = 'access_token';

export default class AuthPlugin {

    constructor(api) {
        this.endpoint = api;
        this.token = null;

        const token = Vue.cookie.get(STORE_KEY);
        if (token) {
            this.token = token;
        }
    }

    static install(_Vue, opts) {
        const plugin = new AuthPlugin(Vue.config.apiEndpoint);
        Object.defineProperties(Vue, {
            auth: {
                get() {
                    return plugin
                }
            }
        });

        Object.defineProperties(Vue.prototype, {
            $auth: {
                get() {
                    return plugin
                }
            }
        })
    }

    isAuthenticated() {
        return typeof this.token === 'string' && this.token !== null
    }

    login(password) {
        return Vue.http.post(`${this.endpoint}/auth/login`, { password })
            .then(response => {
                const { token } = response.body;
                this.token = token;
                Vue.cookie.set(STORE_KEY, token);
            })
    }

}
