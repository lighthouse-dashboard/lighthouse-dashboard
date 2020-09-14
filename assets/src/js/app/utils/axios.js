import axios from 'axios';
import { COOKIE_NAME } from '../config/cookie-name';
import { eraseCookie, getCookie } from './cookie';

const AUTH_ERRORS = [401, 403];

export default (ignoreInterceptors = false) => {
    const jwt = getCookie(COOKIE_NAME);
    const opts = {
        timeout: 30000,
    };

    if (jwt) {
        opts.headers = { Authorization: `Bearer ${ jwt }` };
    }

    const instance = axios.create(opts);

    if (!ignoreInterceptors) {
        instance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (AUTH_ERRORS.includes(error.response.status)) {
                eraseCookie(COOKIE_NAME);
                window.location.href = '/';
            }
            return Promise.reject(error);
        });
    }

    return instance;
};
