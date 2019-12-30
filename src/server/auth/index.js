import CONFIG from '../../../dashboard.config';

export default function(decoded) {
    return { isValid: decoded.token === CONFIG.SERVER.API.AUTH_TOKEN };
};
