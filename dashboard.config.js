require('dotenv').config();

export default {
    DATE_FORMAT: 'dd/MM HH:mm',
    UI: {
        USE_DARK_MODE: true,
    },

    SERVER: {
        API: {
            SITE_REPORT_LIMIT: 100,
            REPORT_VALUES: [
                'performance',
                'seo',
                'pwa',
                'accessibility',
                'best-practices',
            ],
        },
        DB: {
            MONGO_DB_URL: process.env.MONGO_DB_URL,
            MONGO_DB_NAME: process.env.MONGO_DB_NAME,
        },
        SHOW_ERROR_PAGES: process.env.SHOW_ERROR_PAGES,
        CRONJOB: {
            ENABLED: true,
            RUN_AUDITS: '*/30 * * * *',
        },
    },
};
