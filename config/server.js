export default {
    API: {
        /** @var {number} */
        SITE_REPORT_LIMIT: 50,

        /** @var {number} */
        CACHE_EXPIRES_IN: 15 * 60 * 1000, //15mins
    },

    DB: {
        /** @var {number|false} */
        MAX_RAW_DATA_HISTORY: process.env.MAX_RAW_DATA_HISTORY || 100,

        /** @var {number|false} */
        MAX_REPORTS_HISTORY_AGE: 20 * 24 * 60 * 60 * 1000, // 20 days
    },

    AUDIT: {
        /** @var {string} */
        CHROMIUM_PATH: process.env.GOOGLE_CHROME_BIN,

        /** @var {number} */
        CHROMIUM_PORT: 9222,
    },
};
