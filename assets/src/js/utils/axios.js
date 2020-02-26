import axios from 'axios';
import { COOKIE_NAME } from '../config/cookie-name';
import { getCookie } from './cookie';

export default () => {
    const jwt = getCookie(COOKIE_NAME);
    const opts = {
        timeout: 30000,
    };

    if (jwt) {
        opts.headers = { Authorization: `Bearer ${ jwt }` };
    }

    axios.interceptors.response.use(function(response) {
        // Do something with response data
        return response;
    }, function(error) {
        console.log(error);
        return Promise.reject(error);
    });
    return axios.create(opts);
};
