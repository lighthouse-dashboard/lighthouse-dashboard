import { COOKIE_NAME } from '../../../config/cookie-name';
import { getCookie } from '../../../utils/cookie';

export default {
    jwt: getCookie(COOKIE_NAME) || null,
    isLoggedIn: getCookie(COOKIE_NAME) !== null || false,
};
