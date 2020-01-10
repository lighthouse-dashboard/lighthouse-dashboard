import CONFIG from '../../dashboard.config.js';

export default function(decoded) {
    return { isValid: decoded.token === CONFIG.SERVER.API.LOGIN_PASS };
};
