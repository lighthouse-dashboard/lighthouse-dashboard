export default {
    API: {
        /**
         * Limit the amount of returned reports per overview
         * @var {number}
         */
        SITE_REPORT_LIMIT: 50,

        /**
         * Cache lifetime of requests
         * @var {number}
         */
        CACHE_EXPIRES_IN: 15 * 60 * 1000, //15mins
    },

    DB: {
        /**
         * Amount of raw lighthouse reports to store in DB
         * The higher the value, the more space will be required
         * @var {number|false}
         */
        MAX_RAW_DATA_HISTORY: process.env.MAX_RAW_DATA_HISTORY || false,

        /**
         * Delete reports which are older than this timestamp
         * @var {number|false}
         */
        MAX_REPORTS_HISTORY_AGE: 20 * 24 * 60 * 60 * 1000, // 20 days
    },

    AUDIT: {
        /**
         * Path to the chromium binary
         * @var {string}
         */
        CHROMIUM_PATH: process.env.GOOGLE_CHROME_BIN,

        /**
         * Port to use for the debug connection
         * @var {number}
         */
        CHROMIUM_PORT: 9222,
    },
};
