import { SET_LOGGED_IN, SET_JWT } from '../mutation-types';

export function setLoggedIn({ commit }, { isLoggedIn }) {
    commit(SET_LOGGED_IN, { isLoggedIn });
}

export function setJwt({ commit }, { jwt }) {
    commit(SET_JWT, { jwt });
    localStorage.setItem('JWT', jwt);
}
