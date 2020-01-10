import axios from 'axios';

export default () => {
    const jwt = localStorage.getItem('JWT');
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
