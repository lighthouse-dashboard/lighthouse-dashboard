import { COOKIE_NAME } from '../config/cookie-name';
import { getCookie } from './cookie';

export const authRouteGuard = (to, from, next) => {
    if (!to.meta.requiresAuth) {
        return next();
    }

    const token = getCookie(COOKIE_NAME);
    if (token) {
        return next();
    }

    return next({ name: 'login' });
};
