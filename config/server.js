export default {
    api: {
        /**
         * Limit the amount of returned reports per overview
         * @var {number}
         */
        siteReportLimit: 50,
        entriesLimit: 50,
    },

    db: {
        /**
         * Amount of raw lighthouse reports to store in DB
         * The higher the value, the more space will be required
         * @type {null | string}
         */
        maxRawReports: process.env.MAX_RAW_DATA_HISTORY || null,

        /**
         * Delete reports which are older than this timestamp
         * @var {number|false}
         */
        maxReportsAge: 20 * 24 * 60 * 60 * 1000, // 20 days
    },

};
