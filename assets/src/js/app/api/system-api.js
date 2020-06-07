import { GET_SYSTEM_INFO_URL } from '../config/routes';
import axios from '../utils/axios';

/**
 * Fetch system info from backend
 * @return {Promise<System.Info>}
 */
export const fetchSystemInfo = async () => {
    const { data } = await axios().get(GET_SYSTEM_INFO_URL);
    return data;
};
