import { SET_JWT, SET_LOGGED_IN } from '../mutation-types';

export default {
    [SET_LOGGED_IN](state, { isLoggedIn }) {
        state.isLoggedIn = isLoggedIn;
    },

    [SET_JWT](state, { jwt }) {
        state.jwt = jwt;
    },
};
