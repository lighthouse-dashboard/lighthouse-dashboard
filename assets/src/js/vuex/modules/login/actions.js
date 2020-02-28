import { AUTH_URL } from '../../../config/routes';
import axios from '../../../utils/axios';
import { SET_JWT, SET_LOGGED_IN } from '../mutation-types';

export async function doLogin({ commit }, { password }) {
    const { data } = await axios(true).post(AUTH_URL, { password });
    commit(SET_JWT, { jwt: data.jwt });
    commit(SET_LOGGED_IN, { isLoggedIn: true });
}

export function logout({ commit }) {
    commit(SET_JWT, { jwt: null });
    commit(SET_LOGGED_IN, { isLoggedIn: false });
}
