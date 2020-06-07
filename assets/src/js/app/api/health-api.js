import { GET_HEALTH_API } from '../config/routes';
import axios from '../utils/axios';

export const fetchHealth = async () => {
    const { data } = await axios().get(GET_HEALTH_API);
    return data;
};
