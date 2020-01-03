import axios from 'axios';

export default () => {
    const jwt = localStorage.getItem('JWT');
    if (!jwt) {
        throw new Error('No JWT token found in local storage');
    }

    return axios.create({
        timeout: 30000,
        headers: { Authorization: `Bearer ${ jwt }` },
    });
}
