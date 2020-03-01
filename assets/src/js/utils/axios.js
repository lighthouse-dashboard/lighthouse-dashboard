import axios from 'axios';
import { COOKIE_NAME } from '../config/cookie-name';
import { eraseCookie, getCookie } from './cookie';

export default (ignoreAuthError = false) => {
    const jwt = getCookie(COOKIE_NAME);
    const opts = {
        timeout: 30000,
    };

    if (jwt) {
        opts.headers = { Authorization: `Bearer ${ jwt }` };
    }

    const instance = axios.create(opts);

    instance.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (!ignoreAuthError) {
            eraseCookie(COOKIE_NAME);
            window.location.href = '/';
        }
        return Promise.reject(error);
    });

    return instance;
};
