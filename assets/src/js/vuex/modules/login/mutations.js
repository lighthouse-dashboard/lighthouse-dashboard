import { SET_JWT, SET_LOGGED_IN } from '../mutation-types';

export default {
    [SET_LOGGED_IN](state, { isLoggedIn }) {
        state.isLoggedIn = isLoggedIn;
        if (!isLoggedIn) {
            localStorage.removeItem('JWT');
        }
    },

    [SET_JWT](state, { jwt }) {
        state.jwt = jwt;
        if (jwt) {
            localStorage.setItem('JWT', jwt);
        } else {
            localStorage.removeItem('JWT');
        }
    },
};
