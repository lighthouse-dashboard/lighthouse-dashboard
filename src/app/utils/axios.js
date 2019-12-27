import axios from 'axios';
import CONFIG from '../../../dashboard.config';

export default axios.create({
    timeout: 30000,
    headers: { Authorization: `Bearer ${ CONFIG.SERVER.API.AUTH_TOKEN }` },
});
