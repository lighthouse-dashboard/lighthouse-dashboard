import CONFIG from '../../dashboard.config.js';

export default function validate(decoded) {
    return { isValid: decoded.token === CONFIG.SERVER.API.LOGIN_PASS };
};
