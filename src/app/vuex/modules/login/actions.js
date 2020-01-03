import { SET_JWT, SET_LOGGED_IN } from '../mutation-types';

export function setLoggedIn({ commit }, { isLoggedIn }) {
    commit(SET_LOGGED_IN, { isLoggedIn });
}

export function setJwt({ commit }, { jwt }) {
    commit(SET_JWT, { jwt });
}

export function logout({ commit }) {
    commit(SET_JWT, { jwt: null });
    commit(SET_LOGGED_IN, { isLoggedIn: false });
}
