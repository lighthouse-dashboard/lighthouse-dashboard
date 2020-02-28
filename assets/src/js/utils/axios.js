import axios from 'axios';
import { COOKIE_NAME } from '../config/cookie-name';
import { eraseCookie, getCookie } from './cookie';

export default () => {
    const jwt = getCookie(COOKIE_NAME);
    const opts = {
        timeout: 30000,
    };

    if (jwt) {
        opts.headers = { Authorization: `Bearer ${ jwt }` };
    }

    axios.interceptors.response.use(function(response) {
        if (response.status === 401) {
            eraseCookie(COOKIE_NAME);
            window.location.href = '/';
            return null;
        }
        // Do something with response data
        return response;
    }, function(error) {
        eraseCookie(COOKIE_NAME);
        window.location.href = '/';
        return Promise.reject(error);
    });
    return axios.create(opts);
};
