import { GET_UPDATES_URL } from '../config/routes';
import axios from '../utils/axios';

/**
 */
export const checkForUpdates = async () => {
    const { data } = await axios(true).get( GET_UPDATES_URL, { params: { force: true } } );
    return data;
};
