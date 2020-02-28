import CONFIG from '../../server.config';

export default function validate(decoded) {
    return { isValid: decoded.token === CONFIG.API.LOGIN_PASS };
};
