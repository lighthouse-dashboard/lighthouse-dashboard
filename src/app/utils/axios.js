import axios from 'axios';

export default (jwt) => axios.create({
    timeout: 30000,
    headers: { Authorization: `Bearer ${ jwt }` },
});
