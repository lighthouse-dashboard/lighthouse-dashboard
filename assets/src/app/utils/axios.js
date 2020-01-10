import axios from 'axios';

export default () => {
    const jwt = localStorage.getItem('JWT');
    const opts = {
        timeout: 30000,
    };

    if (jwt) {
        opts.headers = { Authorization: `Bearer ${ jwt }` };
    }

    return axios.create(opts);
};
