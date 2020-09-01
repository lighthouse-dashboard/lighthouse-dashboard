import { name, version } from '../../../package.json';

export const DEFAULT_PARAMS = {
    G_ANALYTICS_ID: process.env.G_ANALYTICS_ID || false,
    TITLE: name,
    VERSION: version,
};

export const getDefaultParams = (request) => {
    return {
        ...DEFAULT_PARAMS,
        isAuthenticated: request.auth.isAuthenticated,
        route: request.route.fingerprint || request.route.path,
    };
};

export default getDefaultParams;
