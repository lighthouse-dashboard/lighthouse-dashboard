import { GET_HEALTH_API } from '../config/routes';
import axios from '../utils/axios';

/**
 * Get health info from system
 * @return {Promise<Health.Health>}
 */
export const fetchHealth = async () => {
    const { data } = await axios().get(GET_HEALTH_API);
    return data;
};
