export const getAuthStrategy = () => {
    if (new Boolean(process.env.ALLOW_ANONYMOUS_VIEW) === true) {
        return {
            strategy: 'jwt',
            mode: 'optional',
        };
    }
    return {
        strategy: 'jwt',
    };
};
