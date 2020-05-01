export default {
    api: {
        /**
         * Limit the amount of returned reports per overview
         * @var {number}
         */
        siteReportLimit: 50,

    },

    db: {
        /**
         * Amount of raw lighthouse reports to store in DB
         * The higher the value, the more space will be required
         * @var {number|false}
         */
        maxRawReports: process.env.MAX_RAW_DATA_HISTORY || false,

        /**
         * Delete reports which are older than this timestamp
         * @var {number|false}
         */
        maxReportsAge: 20 * 24 * 60 * 60 * 1000, // 20 days
    },

    lh: {
        /**
         * Path to the chromium binary
         * @var {string}
         */
        chromiumBinaryPath: process.env.GOOGLE_CHROME_BIN,

        /**
         * Port to use for the debug connection
         * @var {number}
         */
        chromiumPort: 9222,
    },
};
