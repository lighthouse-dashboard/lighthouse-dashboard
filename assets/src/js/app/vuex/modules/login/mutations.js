import { COOKIE_NAME } from '../../../config/cookie-name';
import { eraseCookie, setCookie } from '../../../utils/cookie';
import { SET_JWT, SET_LOGGED_IN } from '../mutation-types';

export default {
    [SET_LOGGED_IN](state, { isLoggedIn }) {
        state.isLoggedIn = isLoggedIn;
        if (!isLoggedIn) {
            eraseCookie(COOKIE_NAME, null);
        }
    },

    [SET_JWT](state, { jwt }) {
        state.jwt = jwt;
        if (jwt) {
            setCookie(COOKIE_NAME, jwt);
        } else {
            eraseCookie(COOKIE_NAME, null);
        }
    },
};
