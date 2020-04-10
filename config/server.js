export default {
    API: {
        SITE_REPORT_LIMIT: 50,
        //msec
        CACHE_EXPIRES_IN: 15 * 60 * 1000, //15mins
    },

    AUDIT: {
        CHROMIUM_PATH: process.env.GOOGLE_CHROME_BIN,
        CHROMIUM_PORT: 9222,
    },
};
